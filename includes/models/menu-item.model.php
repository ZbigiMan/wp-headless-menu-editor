<?php
namespace HME_MODELS;

class MenuItem
{
    public $model;

    public function __construct($data)
    {
        $this->$model = array(
            "menu-item-object-id" => $data["object_id"],
            "menu-item-object" => $data["object"],
            "menu-item-parent-id" => $data["menu_item_parent"],
            "menu-item-position" => $data["menu_order"],
            "menu-item-type" => $data["post_type"],
            "menu-item-title" => $data["title"],
            "menu-item-url" => $data["url"],
            "menu-item-description" => $data["description"],
            "menu-item-attr-title" => $data["attr_title"],
            "menu-item-target" => $data["target"],
            "menu-item-classes" => $data["classes"] || [""],
            "menu-item-xfn" => $data["xfn"] || "",
            "menu-item-status" => "publish"
        );
    }

}
