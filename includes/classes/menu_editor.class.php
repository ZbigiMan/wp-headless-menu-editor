<?php
namespace _MENU_EDITOR;

require PLUGIN_DIR_PATH . '/includes/models/menu-item.model.php';
require PLUGIN_DIR_PATH . '/includes/models/post-menu-item.model.php';

use _MODELS as _models;

class MenuEditor
{

    public function __construct()
    {}

    // Init ajax functions
    public function init_ajax()
    {
        $ajax_functions = array(
            'get_menus',
            'get_menu_data',
            'save_menu',
            'get_posts',
            'create_new_menu',
            'delete_menu'
        );

        foreach ($ajax_functions as $func) {
            add_action('wp_ajax_' . $func, array($this, 'ajax_' . $func));
            add_action('wp_ajax_nopriv_' . $func, array($this, 'ajax_' . $func));
        }

    }

    // Get initial data
    public function get_initial_data()
    {

        $menus = $this->get_menus();

        if (count($menus) === 0) {
            $this->create_menu(
                'Main Menu',
                $this->get_posts(['Page'])
            );
            $menus = $this->get_menus();
        }

        $locale = get_locale();

        return (object) array(
            "locale" => array("current" => $locale),
            "urls" => array(
                "rest" => $this->get_rest_url() . 'hme/v1/',
                "wpajax" => $this->get_ajax_url(),
                "admin" => $this->get_admin_url()
            ),
            "menus" => $menus,
            "posts_types" => $this->get_posts_types()
        );
    }

    public function ajax_create_new_menu()
    {
        $menu_name = $_POST["menu_name"];
        if (isset($menu_name)) {
            $new_menu_id = $this->create_menu($menu_name, []);
            $res = array(
                'new_menu_id' => $new_menu_id,
                'menus' => $this->get_menus()
            );
            echo json_encode($res);
            wp_die();
        }
    }

    public function ajax_delete_menu()
    {
        $menu_id = $_POST['menu_id'];
        if (isset($menu_id)) {
            wp_delete_nav_menu($menu_id);
            $res = array(
                'deleted_menu_id' => $menu_id,
                'menus' => $this->get_menus()
            );
            echo json_encode($res);
            wp_die();
        }
    }

    public function get_rest_url()
    {
        return str_replace('wp-admin', 'wp-json', admin_url());
    }

    public function get_ajax_url()
    {
        return admin_url('admin-ajax.php');
    }

    public function get_admin_url()
    {
        return admin_url();
    }

    // Create new menu
    public function create_menu($menu_name, $menu_data)
    {
        $menu_id = wp_create_nav_menu($menu_name);
        $this->save_menu($menu_id, $menu_data);
        return $menu_id;
    }

    // Get menus
    public function get_menus()
    {
        return get_terms('nav_menu', array(
            'hide_empty' => false,
        ));
    }

    // AjaxService get menus
    public function ajax_get_menus()
    {
        echo json_encode($this->get_menus());
        wp_die();
    }

    // AjaxService get menu items
    public function ajax_get_menu_data()
    {
        if (isset($_GET["menu_id"])) {
            $menu_id = $_GET["menu_id"];
            $menu_items = wp_get_nav_menu_items($menu_id);
            echo json_encode($menu_items);
            wp_die();
        };
    }

    // Get posts types
    public function get_posts_types()
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
    public function ajax_get_posts()
    {
        if (isset($_POST["types"])) {

            $types = $_POST["types"];
            $types = stripslashes($types);
            $types = json_decode($types, true);
            $posts = $this->get_posts($types);

            echo json_encode($posts);
            wp_die();
        }
    }

    private function get_posts($types)
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

            $post_menu_item = new _models\PostMenuItem($post);
            array_push($res, $post_menu_item->$model);
        }
        return $res;
    }

    // AjaxService save menu
    public function ajax_save_menu()
    {

        if (isset($_POST["menu_id"]) && isset($_POST["menu_data"])) {
            $menu_id = $_POST["menu_id"];
            $menu_data = $_POST["menu_data"];
            $menu_data = stripslashes($menu_data);
            $menu_data = json_decode($menu_data, true);

            $this->save_menu($menu_id, $menu_data);
            echo json_encode(wp_get_nav_menu_items($menu_id));
            wp_die();
        };
    }

    private function save_menu($menu_id, $menu_data)
    {
        try {
            foreach ($menu_data as $data) {
                $menu_item = new _models\MenuItem($data);
                wp_update_nav_menu_item(
                    $menu_id,
                    $data["db_id"],
                    $menu_item->$model
                );

                if ($data["__delete"] === true) {
                    wp_delete_post($data["db_id"]);
                }
            };
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
}
