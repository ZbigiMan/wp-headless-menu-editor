<?php
namespace HME_MODELS;

class PostMenuItem
{
    public $model;

    public function __construct($data)
    {
        $this-> $model = array(
            "attr_title" => "",
            "classes" => [""],
            "description" => "",
            "menu_item_parent" => "0",
            "object" => $data->post_type,
            "object_id" => $data->ID,
            "post_parent" => $data->post_parent,
            "post_title" => $data->post_title,
            "target" => "",
            "title" => $data->post_title,
            "type" => $data->post_type,
            "type_label" => $data->post_type_label,
            "url" => $data->url,
            "xfn" => "",
            "post_date" => $data->post_date,
            "post_modified" => $data->post_modified
        );
    }
}
