import "./frappe/ui/toolbar/navbar.html";
import "./frappe/list/list_sidebar.html";
import "./frappe/ui/page.html";

frappe.provide('design_app.templates');

design_app.templates.navbar = `
<header class="navbar navbar-expand sticky-top">
    <!-- Your navbar template content -->
</header>
`;

design_app.templates.list_sidebar = `
<div class="list-sidebar overlay-sidebar">
    <!-- Your list sidebar template content -->
</div>
`;

design_app.templates.page = `
<div class="page-content">
    <!-- Your page template content -->
</div>
`;

// Initialize templates
frappe.ready(function() {
    // Your initialization code here
});