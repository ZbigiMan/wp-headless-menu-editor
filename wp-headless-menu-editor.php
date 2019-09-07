<?php

/*
 * Plugin Name: WP Headless Menu Editor
 * Description: Menu editor for headless WordPress  - independent of Appearance. Adds menus to wp-json api.
 * Version:     1.0.0.
 * Author:      Zbigi Man
 * Author URI:  https://zbigiman.com
 * License:     GPL-2.0+
 * Copyright:   2019 Zbigi Man
 */

if (!defined('ABSPATH')) {
    exit;
}
define( 'PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );

require_once PLUGIN_DIR_PATH . '/includes/classes/menu_editor.class.php';

use _MENU_EDITOR as _menu_editor;

class WPHeadlessMenuEditor
{
    private $menuEditor;

    public function __construct()
    {
        $this->$menuEditor = new _menu_editor\MenuEditor();

        add_action('admin_menu', array($this, 'init_admin_menu'));
        add_action('admin_init', array($this, 'init_assets'));

        add_action('rest_api_init', function () {
            register_rest_route( 'hme/v1','/menus', array(
              'methods' => 'GET',
              'callback' => 'get_menus_to_api',
            ));

            register_rest_route( 'hme/v1','/menus/(?P<id>\d+)', array(
                'methods' => 'GET',
                'callback' => 'get_menu_data_to_api',
              ));
        });

        function get_menus_to_api()
        {
            return get_terms('nav_menu', array(
                'hide_empty' => false,
            ));
        }

        function get_menu_data_to_api($data)
        {
            return wp_get_nav_menu_items($data['id']);
        }

        $this->$menuEditor->init_ajax();
    }

    public function activate()
    {
        $this->init_admin_menu();
        flush_rewrite_rules();
    }

    public function deactivate()
    {
        flush_rewrite_rules();
    }

    public function init_admin_menu()
    {
        add_menu_page('Menu Editor',
            'Menu Editor',
            'manage_options',
            'menus_editor',
            array($this, 'init_menu_editor'),
            'dashicons-list-view',
            2);

        add_menu_page('Menu API',
            'Menu API',
            'manage_options',
            'menus_api',
            array($this, 'init_menu_api'),
            'dashicons-rest-api',
            3);
    }

    public function init_assets()
    {
        wp_register_script('script_handle', plugin_dir_url(__FILE__) . '/scripts/menu_editor.js');

        $data = $this->$menuEditor->get_initial_data();

        wp_enqueue_script('script_handle');
        wp_localize_script('script_handle', 'data', $data);
        wp_enqueue_style('styles', plugin_dir_url(__FILE__) . '/styles/styles.css', false, '1.1', 'all');
    }

    public function init_menu_editor()
    {
        $this->init_assets();

        require_once PLUGIN_DIR_PATH. '/includes/templates/menu_editor.template.php';
    }

    public function init_menu_api()
    {
        $this->init_assets();
        require_once PLUGIN_DIR_PATH. '/includes/templates/menu_api.template.php';
    }
}

if (class_exists('WPHeadlessMenuEditor')) {
    $WPHeadlessMenuEditor = new WPHeadlessMenuEditor();
}

register_activation_hook(__FILE__, array($WPHeadlessMenuEditor, 'activate'));
register_activation_hook(__FILE__, array($WPHeadlessMenuEditor, 'deactivate'));
