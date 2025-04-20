<?php
/*
Plugin Name: WP Photo Editor
Description: فتوشاپ داخل وردپرس با امکانات پیشرفته و پردازش تصویر
Version: 1.0
Author: شما
*/

add_action('admin_menu', function () {
    add_menu_page('ویرایشگر تصویر', 'ویرایشگر تصویر', 'upload_files', 'wp-photo-editor', 'wppe_render_editor', 'dashicons-format-image', 25);
});

function wppe_render_editor() {
    echo '<div class="wrap">
        <h1>ویرایشگر تصویر پیشرفته</h1>
        <input type="file" id="imageLoader" accept="image/*" />
        <div class="wppe-toolbar">
            <button onclick="addText()">متن</button>
            <button onclick="addRect()">مستطیل</button>
            <button onclick="addCircle()">دایره</button>
            <button onclick="applyFilters()">فیلتر</button>
            <button onclick="cropImage()">برش</button>
            <button onclick="removeSelected()">حذف</button>
            <button onclick="removeBackground()">حذف بک‌گراند</button>
            <button onclick="saveImage()">ذخیره</button>
            <button onclick="downloadImage()">دانلود</button>
        </div>
        <canvas id="editor-canvas" width="1000" height="600" style="border:1px solid #ccc"></canvas>
    </div>';
}

add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'toplevel_page_wp-photo-editor') return;

    wp_enqueue_style('wppe-style', plugin_dir_url(__FILE__) . 'assets/editor.css');
    wp_enqueue_script('fabric', plugin_dir_url(__FILE__) . 'assets/libs/fabric.min.js');
    //wp_enqueue_script('fabric', 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js');
    wp_enqueue_script('wppe-script', plugin_dir_url(__FILE__) . 'assets/editor.js', ['fabric'], false, true);
});
