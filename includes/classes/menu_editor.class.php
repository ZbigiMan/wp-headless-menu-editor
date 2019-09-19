<?php

// Create HME_MENU_EDITOR namespace
namespace HME_MENU_EDITOR;

// Import Models
require HME_PLUGIN_DIR_PATH . '/includes/models/menu-item.model.php';
require HME_PLUGIN_DIR_PATH . '/includes/models/post-menu-item.model.php';

// use HME_MODELS namespace
use HME_MODELS as hme_models;

// HMEMenuEditor Class
class HMEMenuEditor
{

    public function __construct()
    {}

    // Init ajax functions
    public function init_ajax()
    {
        $ajax_functions = array(
            'hme_get_menus',
            'hme_get_menu_data',
            'hme_save_menu',
            'hme_get_posts',
            'hme_create_new_menu',
            'hme_delete_menu'
        );

        foreach ($ajax_functions as $func) {
            add_action('wp_ajax_' . $func, array($this, 'ajax_' . $func));
            add_action('wp_ajax_nopriv_' . $func, array($this, 'ajax_' . $func));
        }

    }

    // Get initial data
    public function hme_get_initial_data()
    {
        $menus = $this->hme_get_menus();

        if (count($menus) === 0) {
            $this->hme_create_menu(
                'Main Menu',
                $this->hme_get_posts(['Page'])
            );
            $menus = $this->hme_get_menus();
        }

        $locale = get_locale();

        return (object) array(
            "locale" => array("current" => $locale),
            "urls" => array(
                "rest" => $this->hme_get_rest_url() . 'hme/v1/',
                "wpajax" => $this->hme_get_ajax_url(),
                "admin" => $this->hme_get_admin_url(),
                "routerBase" => $this->hme_get_router_base()
            ),
            "menus" => $menus,
            "posts_types" => $this->hme_get_posts_types()
        );
    }

    // Create new menu
    public function ajax_hme_create_new_menu()
    {
        $menu_name = sanitize_text_field($_POST["menu_name"]);
        if (isset($menu_name)) {
            $new_menu_id = $this->hme_create_menu($menu_name, []);
            $res = array(
                'new_menu_id' => $new_menu_id,
                'menus' => $this->hme_get_menus()
            );
            echo json_encode($res);
            wp_die();
        }
    }

    // Delete menu
    public function ajax_hme_delete_menu()
    {
        $menu_id = $this->hme_sanitize_int($_POST['menu_id']);
        if (isset($menu_id) && intval($menu_id)) {
            wp_delete_nav_menu($menu_id);
            $res = array(
                'deleted_menu_id' => $menu_id,
                'menus' => $this->hme_get_menus()
            );
            echo json_encode($res);
            wp_die();
        }
    }

    // Get WP REST API URL
    public function hme_get_rest_url()
    {
        return str_replace('wp-admin', 'wp-json', admin_url());
    }

    // Get WP Ajax URL
    public function hme_get_ajax_url()
    {
        return admin_url('admin-ajax.php');
    }

    // Get WP Admin URL
    public function hme_get_admin_url()
    {
        return admin_url();
    }

    // Get site URL
    public function hme_get_site_base_url()
    {
        return $_SERVER['REQUEST_SCHEME'] ."://". $_SERVER['SERVER_NAME'];
    }

    // Get router base
    public function hme_get_router_base()
    {
        $admin_url = str_replace(":".$_SERVER['SERVER_PORT'] , '' , $this->hme_get_admin_url());
        $site_base_url = $this->hme_get_site_base_url();
        return str_replace($site_base_url, "", $admin_url);
    }

    // Create new menu
    public function hme_create_menu($menu_name, $menu_data)
    {
        $menu_id = wp_create_nav_menu($menu_name);
        $this->hme_save_menu($menu_id, $menu_data);
        return $menu_id;
    }

    // Get menus
    public function hme_get_menus()
    {
        return get_terms('nav_menu', array(
            'hide_empty' => false,
        ));
    }

    // AjaxService get menus
    public function ajax_hme_get_menus()
    {
        echo json_encode($this->hme_get_menus());
        wp_die();
    }

    // AjaxService get menu items
    public function ajax_hme_get_menu_data()
    {
        $menu_id = $_GET["menu_id"];
        if (isset($menu_id) && intval($menu_id)) {
            $menu_items = wp_get_nav_menu_items($menu_id);
            echo json_encode($menu_items);
            wp_die();
        };
    }

    // Get posts types
    public function hme_get_posts_types()
    {
        $args = array(
            'public' => true,
        );

        $output = 'name';
        $operator = 'and';
        $post_types = array_keys(
            get_post_types($args, $output, $operator)
        );
        $post_types = array_diff($post_types, ['attachment']);
        $post_types_array = [];
        foreach ($post_types as $type) {
            $post_object = get_post_type_object($type);
            array_push($post_types_array, (object) [
                'value' => $type,
                'text' => $post_object->labels->singular_name,
            ]);
        }

        return $post_types_array;

    }

    // AjaxService get posts
    public function ajax_hme_get_posts()
    {
        $types = $_POST["types"];
        $types = stripslashes($types);
        $types = json_decode($types, true);
        $types = $this->hme_sanitize_array_of_strings($types);

        if (isset($types) && is_array($types)) {
            $posts = $this->hme_get_posts($types);
            echo json_encode($posts);
            wp_die();
        }
    }

    // Get posts
    private function hme_get_posts($types)
    {
        $res = [];

        if (sizeof($types) === 0) {
            return $res;
        }

        $posts = get_posts([
            'post_type' => $types,
            'post_status' => 'publish',
            'numberposts' => -1,
            'order' => 'ASC',
        ]);

        if (sizeof($types) === 0) {
            return $res;
        }

        foreach ($posts as $post) {
            $post->url = get_permalink($post);
            $post_object = get_post_type_object($post->post_type);
            $post->post_type_label = $post_object->labels->singular_name;
            $post->description = $post_object->description;

            $post_menu_item = new hme_models\PostMenuItem($post);
            array_push($res, $post_menu_item->get_model());
        }
        return $res;
    }

    // AjaxService save menu
    public function ajax_hme_save_menu()
    {
        $menu_id = $this->hme_sanitize_int($_POST["menu_id"]);
        $menu_data = $this->hme_sanitize_menu_data($_POST["menu_data"]);

        if (isset($menu_id) && intval($menu_id) && isset($menu_data)) {
            $this->hme_save_menu($menu_id, $menu_data);
            echo json_encode(wp_get_nav_menu_items($menu_id));
            wp_die();

        }
    }

    // Save menu
    private function hme_save_menu($menu_id, $menu_data)
    {
        try {
            foreach ($menu_data as $data) {
                $menu_item = new hme_models\MenuItem($data);
                wp_update_nav_menu_item(
                    $menu_id,
                    $data["db_id"],
                    $menu_item->get_model()
                );

                if ($data["__delete"] === true) {
                    wp_delete_post($data["db_id"]);
                }
            };
       } catch (Exception $e) {
            echo $e->getMessage();
       }
    }

    // Sanitize int value
    private function hme_sanitize_int($value)
    {
        return filter_var(strip_tags(trim($value)), FILTER_SANITIZE_NUMBER_INT);
    }

    // Sanitize array of strings
    private function hme_sanitize_array_of_strings($array)
    {
        $filtered_array = array();
        foreach($array as $value) {
            array_push($filtered_array, sanitize_text_field($value));
        }
        return $filtered_array;
    }

    // Sanitize date
    private function hme_sanitize_date($date, $format = 'Y-m-d H:i:s')
    {
        $d = strtotime($date);
        if (date($format, $d) === $date) {
            return $date;
        }
        return null;
    }

    private function hme_sanitize_boolean($value)
    {
        return filter_var(strip_tags(trim($value)), FILTER_VALIDATE_BOOLEAN);
    }

    // Sanitize WP Menu data
    private function hme_sanitize_menu_data($menu_data)
    {
        $menu_data = stripslashes($menu_data);
        $menu_data = json_decode($menu_data, true);
        $filtered_data = array();

        foreach($menu_data as $value) {
            array_push($filtered_data, array(
                "ID" => $this->hme_sanitize_int($value["ID"]),
                "post_author" => $this->hme_sanitize_int($value["post_author"]),
                "post_date" => $this->hme_sanitize_date($value["post_date"]),
                "post_date_gmt" => $this->hme_sanitize_date($value["post_date_gmt"]),
                "post_content" => sanitize_text_field($value["post_content"]),
                "post_title" => sanitize_title($value["post_title"]),
                "post_excerpt" => sanitize_text_field($value["post_excerpt"]),
                "post_status" => sanitize_text_field($value["post_status"]),
                "comment_status" => sanitize_text_field($value["comment_status"]),
                "ping_status" => sanitize_text_field($value["ping_status"]),
                "post_password" => sanitize_text_field($value["post_password"]),
                "post_name" => sanitize_text_field($value["post_name"]),
                "to_ping" => sanitize_text_field($value["to_ping"]),
                "pinged" => sanitize_text_field($value["pinged"]),
                "post_modified" => $this->hme_sanitize_date($value["post_modified"]),
                "post_modified_gmt" => $this->hme_sanitize_date($value["post_modified_gmt"]),
                "post_content_filtered" => sanitize_text_field($value["post_content_filtered"]),
                "post_parent" => $this->hme_sanitize_int($value["post_parent"]),
                "guid" => esc_url_raw($value["guid"]),
                "menu_order" => $this->hme_sanitize_int($value["menu_order"]),
                "post_type" => sanitize_text_field($value["post_type"]),
                "post_mime_type" => sanitize_text_field($value["post_mime_type"]),
                "comment_count" => $this->hme_sanitize_int($value["comment_count"]),
                "filter" => sanitize_text_field($value["filter"]),
                "db_id" => $this->hme_sanitize_int($value["db_id"]),
                "menu_item_parent" => $this->hme_sanitize_int($value["menu_item_parent"]),
                "object_id" => $this->hme_sanitize_int($value["object_id"]),
                "object" => sanitize_text_field($value["object"]),
                "type" => sanitize_text_field($value["type"]),
                "type_label" => sanitize_text_field($value["type_label"]),
                "title" => sanitize_title($value["title"]),
                "url" => esc_url_raw($value["url"]),
                "target" => sanitize_text_field($value["target"]),
                "attr_title" => sanitize_title($value["attr_title"]),
                "description" => sanitize_text_field($value["description"]),
                "classes" => $this->hme_sanitize_array_of_strings($value["classes"]),
                "xfn" => sanitize_text_field($value["xfn"]),
                "__delete" => $this->hme_sanitize_boolean($value["__delete"])
            ));
        }
        return $filtered_data;
    }
}
