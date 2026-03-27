<?php
/**
 * SkinSpirit Dynamic Pricing REST API
 *
 * Copy this into WPCode as a PHP snippet (run everywhere).
 * Endpoint: GET /wp-json/skinspirit/v1/prices
 *
 * Returns all pricing entries from the Dynamic Seasonal Pricing plugin
 * with current sale status based on active date periods.
 */

add_action('rest_api_init', function() {
    register_rest_route('skinspirit/v1', '/prices', array(
        'methods'  => 'GET',
        'callback' => 'skinspirit_get_prices',
        'permission_callback' => '__return_true',
    ));
});

function skinspirit_get_prices() {
    // Query all Dynamic Seasonal Pricing posts
    // Post type is 'seasonal_pricing' — adjust if plugin uses different slug
    $posts = get_posts(array(
        'post_type'      => 'seasonal_pricing',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ));

    $today = date('m-d');
    $results = array();

    foreach ($posts as $post) {
        $slug       = $post->post_name;
        $base_price = intval(get_post_meta($post->ID, 'base_price', true));
        $sale_price = intval(get_post_meta($post->ID, 'sale_price', true));
        $periods    = get_post_meta($post->ID, 'seasonal_periods', true);

        $is_on_sale    = false;
        $active_period = null;

        // Check if any period is active today
        if ($periods && is_string($periods)) {
            $lines = explode("\n", trim($periods));
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line)) continue;
                // Format: "Name | MM-DD > MM-DD" or "MM-DD > MM-DD"
                if (preg_match('/(\d{2}-\d{2})\s*>\s*(\d{2}-\d{2})/', $line, $m)) {
                    $start = $m[1];
                    $end   = $m[2];
                    // Handle year-wrapping periods (e.g., 11-24 > 01-28)
                    if ($start <= $end) {
                        $is_active = ($today >= $start && $today <= $end);
                    } else {
                        $is_active = ($today >= $start || $today <= $end);
                    }
                    if ($is_active) {
                        $is_on_sale = true;
                        // Extract period name if present
                        if (preg_match('/^([^|]+)\|/', $line, $nm)) {
                            $active_period = trim($nm[1]);
                        }
                        break;
                    }
                }
            }
        }

        $results[] = array(
            'slug'          => $slug,
            'base_price'    => $base_price,
            'sale_price'    => $sale_price,
            'is_on_sale'    => $is_on_sale,
            'active_period' => $active_period,
        );
    }

    return rest_ensure_response($results);
}
