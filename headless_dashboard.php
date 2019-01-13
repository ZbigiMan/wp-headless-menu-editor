<?php

/*
 * Plugin Name: Headless Dashboard Redux
 * Plugin URI:  https://zbigiman.com/wp-plugins/decapitated_menu_editor
 * Description: Headless Dashboard
 * Version:     1.0.0.
 * Author:      Zbigi Man
 * Author URI:  https://zbigiman.com
 * License:     GPL-2.0+
 * Copyright:   2018 Zbigi Man
 */

if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(__FILE__) . '/includes/classes/menu_editor.class.php';

use _MENU_EDITOR as _menu_editor;

class HeadlesDashboard
{
    private $menuEditor;

    public function __construct()
    {
        $this->$menuEditor = new _menu_editor\MenuEditor();

        add_action('admin_menu', array($this, 'init_admin_menu'));
        add_action('admin_init', array($this, 'init_assets'));
        add_action('admin_init', array($this, 'remove_dashboard_widgets'));

        $this->$menuEditor->init_ajax();
    }

    function remove_dashboard_widgets() {
        remove_action( 'welcome_panel', 'wp_welcome_panel' );
        remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal'); //Removes the 'incoming links' widget
        remove_meta_box('dashboard_plugins', 'dashboard', 'normal'); //Removes the 'plugins' widget
        remove_meta_box('dashboard_primary', 'dashboard', 'normal'); //Removes the 'WordPress News' widget
        remove_meta_box('dashboard_secondary', 'dashboard', 'normal'); //Removes the secondary widget
        remove_meta_box('dashboard_quick_press', 'dashboard', 'side'); //Removes the 'Quick Draft' widget
        remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side'); //Removes the 'Recent Drafts' widget
        remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal'); //Removes the 'Activity' widget
        remove_meta_box('dashboard_right_now', 'dashboard', 'normal'); //Removes the 'At a Glance' widget
        remove_meta_box('dashboard_activity', 'dashboard', 'normal'); //Removes the 'Activity' widget (since 3.8)
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
        add_menu_page('Site Tree',
            'Site Tree',
            'manage_options',
            'site_tree',
            array($this, 'init_plugin'),
            'dashicons-list-view',
            2);
    }

    public function init_assets()
    {
        wp_register_script('script_handle', plugin_dir_url(__FILE__) . '/scripts/menu_editor.js');

        $data = $this->$menuEditor->get_initial_data();

        wp_enqueue_script('script_handle');
        wp_localize_script('script_handle', 'data', $data);
        wp_enqueue_style('styles', plugin_dir_url(__FILE__) . '/styles/styles.css', false, '1.1', 'all');
    }

    public function init_plugin()
    {
        if ($this->$menuEditor->init_menus_data()) {
            $this->init_assets();
        }

        require_once dirname(__FILE__) . '/includes/templates/menu_editor.template.php';
    }
}

if (class_exists('HeadlesDashboard')) {
    $HeadlesDashboard = new HeadlesDashboard();
}

register_activation_hook(__FILE__, array($HeadlesDashboard, 'activate'));
register_activation_hook(__FILE__, array($HeadlesDashboard, 'deactivate'));