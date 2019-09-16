<?php

/*
 * Plugin Name: WP Headless Menu Editor
 * Description: Menu editor for headless WordPress  - independent of Appearance. Adds menus to WP REST API v2.
 * Version:     1.0.0.
 * Author:      Zbigi Man
 * Author URI:  https://zbigiman.com
 * License:     GPL-2.0+
 * Copyright:   2019 Zbigi Man
 */

// exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define( 'HME_PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );

// Import HMEMenuEditor Class
require_once HME_PLUGIN_DIR_PATH . '/includes/classes/menu_editor.class.php';

// Use namespace
use HME_MENU_EDITOR as hme_menu_editor;

// Plugin Class
class WPHeadlessMenuEditor
{
    /**
    * @param $hme_menu_editor - HMEMenuEditor Class instance
    */
    private $hme_menu_editor;

    public function __construct()
    {
        // Create HMEMenuEditor Class instance
        $this->hme_menu_editor = new hme_menu_editor\HMEMenuEditor();

        // Register initial actions
        add_action('admin_menu', array($this, 'hme_init_admin_menu'));
        add_action('admin_init', array($this, 'hme_init_assets'));

        //  Creating WP REST API v2 endpoints
        add_action('rest_api_init', function () {

            // 'hme/v1/menus
            register_rest_route( 'hme/v1','/menus', array(
              'methods' => 'GET',
              'callback' => 'hme_hme_get_menus_to_api',
            ));

            // 'hme/v1/menus/{id}
            register_rest_route( 'hme/v1','/menus/(?P<id>\d+)', array(
                'methods' => 'GET',
                'callback' => 'hme_hme_get_menu_data_to_api',
              ));
        });

        // Get menus endpoint action
        function hme_hme_get_menus_to_api()
        {
            return get_terms('nav_menu', array(
                'hide_empty' => false,
            ));
        }

        // Get menu data endpoint action
        function hme_hme_get_menu_data_to_api($data)
        {
            return wp_get_nav_menu_items($data['id']);
        }

        // init HMEMenuEditor ajax actions
        $this->hme_menu_editor->init_ajax();
    }

    // Plugin activate
    public function activate()
    {
        $this->hme_init_admin_menu();
        flush_rewrite_rules();
    }

    // Plugin deactivate
    public function deactivate()
    {
        flush_rewrite_rules();
    }

    // Add plugin to admin menu
    public function hme_init_admin_menu()
    {
        // Menu Editor
        add_menu_page('Menu Editor',
            'Menu Editor',
            'manage_options',
            'menus_editor',
            array($this, 'hme_init_menu_editor'),
            'dashicons-list-view',
            2);

        // Menu API
        add_menu_page('Menu API',
            'Menu API',
            'manage_options',
            'menus_api',
            array($this, 'init_menu_api'),
            'dashicons-rest-api',
            3);
    }

    // Init assets: javascripts and styles
    public function hme_init_assets()
    {
        wp_register_script('script_handle', plugin_dir_url(__FILE__) . '/scripts/menu_editor.js');

        $data = $this->hme_menu_editor->hme_get_initial_data();

        wp_enqueue_script('script_handle');
        wp_localize_script('script_handle', 'data', $data);
        wp_enqueue_style('styles', plugin_dir_url(__FILE__) . '/styles/styles.css', false, '1.1', 'all');
    }

    // Init Menu Editor
    public function hme_init_menu_editor()
    {
        $this->hme_init_assets();
        require_once HME_PLUGIN_DIR_PATH. '/includes/templates/menu_editor.template.php';
    }

    // Init Menu API
    public function init_menu_api()
    {
        $this->hme_init_assets();
        require_once HME_PLUGIN_DIR_PATH. '/includes/templates/menu_api.template.php';
    }
}

// Plugin Class instance
if (class_exists('WPHeadlessMenuEditor')) {
    $WPHeadlessMenuEditor = new WPHeadlessMenuEditor();
}

// Register activation hooks
register_activation_hook(__FILE__, array($WPHeadlessMenuEditor, 'activate'));
register_activation_hook(__FILE__, array($WPHeadlessMenuEditor, 'deactivate'));
