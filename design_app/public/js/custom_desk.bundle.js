import "./frappe/ui/toolbar/navbar.html";
import "./frappe/list/list_sidebar.html";
import "./frappe/ui/page.html";

frappe.provide('design_app.templates');
frappe.provide('design_app.workspace');

// Initialize workspace functionality
design_app.workspace = {
    init: function() {
        this.bind_workspace_events();
    },

    bind_workspace_events: function() {
        $(document).on('click', '.new-doc-btn', function(e) {
            e.preventDefault();
            const doctype = $(this).data('doctype');
            if (!doctype) return;

            // Handle specific doctypes
            if (doctype === "Item") {
                frappe.new_doc(doctype, {
                    is_stock_item: 1
                });
            } else if (doctype === "Request for Quotation") {
                frappe.new_doc(doctype, {
                    transaction_date: frappe.datetime.get_today()
                });
            } else {
                frappe.new_doc(doctype);
            }
        });
    }
};

// Templates
design_app.templates.navbar = `
<header class="navbar navbar-expand sticky-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <!-- Your navbar content -->
        </div>
    </div>
</header>
`;

design_app.templates.list_sidebar = `
<div class="list-sidebar overlay-sidebar">
    <div class="list-sidebar-content">
        <!-- Your sidebar content -->
    </div>
</div>
`;

design_app.templates.page = `
<div class="page-content">
    <div class="page-container">
        <!-- Your page content -->
    </div>
</div>
`;

// Initialize after Frappe is ready
frappe.ready(function() {
    design_app.workspace.init();

    // Override ListView new doc functionality
    if (frappe.views && frappe.views.ListView) {
        const _ListViewMakeNewDoc = frappe.views.ListView.prototype.make_new_doc;
        frappe.views.ListView.prototype.make_new_doc = function() {
            if (!this || !this.doctype) return;
            try {
                _ListViewMakeNewDoc.apply(this, arguments);
            } catch (e) {
                console.error("Error in make_new_doc:", e);
                frappe.new_doc(this.doctype);
            }
        };
    }
});