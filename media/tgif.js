```{=html}
<table class="quarto-listing-table table table-striped table-responsive" id="project-listing">
    <thead>
        <tr>
            <th scope="col" class="sortable" data-sort="status">Status</th>
            <th scope="col" class="sortable" data-sort="title">Title</th>
            <th scope="col" class="sortable" data-sort="categories">Categories</th>
            <th scope="col">URLs</th>
            <th scope="col" class="sortable" data-sort="contributors">Contributors</th>
        </tr>
    </thead>
    <tbody class="list">
        <%
        // Define icon mappings for categories
        const categoryIcons = {
            "probability": { icon: "bi-dice-5-fill", label: "Probability" },
            "chess": { icon: "bi-grid-3x3", label: "Chess" },
            "logic": { icon: "bi-door-open-fill", label: "Logic" },
            "paper": { icon: "bi-file", label: "Paper" },
            "folding": { icon: "bi-file-earmark", label: "Folding" },
            "cutting": { icon: "bi-scissors", label: "Cutting" },
            "tiling": { icon: "bi-columns", label: "Tiling" },
            "graphs": { icon: "bi-bounding-box-circles", label: "Graphs" },
            "game": { icon: "bi-joystick", label: "Game" },
            "geometry": { icon: "bi-circle-square", label: "Geometry" },
            "card": { icon: "bi-suit-spade-fill", label: "Card" }
        };

        // Define status icons
        const statusIcons = {
            "todo": { icon: "bi-list-task", label: "To Do" },
            "prog": { icon: "bi-hourglass-split", label: "In Progress" },
            "done": { icon: "bi-check-square-fill", label: "Completed" }
        };

        if (!items || items.length === 0) {
        %>
            <tr>
                <td colspan="5" class="text-center py-4">No items found.</td>
            </tr>
        <% } else {
            // Process each item in the collection
            for (const item of items) {
                // Sanitize item properties for safety
                const title = item.title || "Untitled";
                const path = item.path || "#";
                const status = item.status || "todo";
                const categories = Array.isArray(item.categories) ? item.categories : [];
                const urls = Array.isArray(item.urls) ? item.urls : [];
                const contributors = Array.isArray(item.contributors) ? item.contributors : [];
        %>
            <tr data-index="<%= items.indexOf(item) %>" data-status="<%= status %>" <%= metadataAttrs(item) %>>
                <td class="listing-status">
                    <% if (statusIcons[status]) { %>
                        <span class="bi <%= statusIcons[status].icon %>"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="<%= statusIcons[status].label %>"
                              aria-label="Status: <%= statusIcons[status].label %>">
                        </span>
                    <% } else { %>
                        <span aria-label="Status: Unknown"><%= status %></span>
                    <% } %>
                </td>

                <td class="listing-title">
                    <a href="<%= path %>"><%= title %></a>
                </td>

                <td class="listing-categories">
                    <% if (categories.length === 0) { %>
                        <span class="text-muted small">None</span>
                    <% } else { %>
                        <div class="category-data" aria-label="Categories: <%= categories.join(', ') %>">
                            <% for (const category of categories) {
                                const catInfo = categoryIcons[category] || { icon: "bi-tag", label: category };
                            %>
                                <span class="bi <%= catInfo.icon %>"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="<%= catInfo.label %>"
                                      data-category="<%= category %>">
                                </span>
                            <% } %>
                        </div>
                    <% } %>
                </td>

                <td class="listing-urls">
                    <% if (urls.length === 0) { %>
                        <span class="text-muted small">None</span>
                    <% } else { %>
                        <div>
                            <% for (let i = 0; i < urls.length; i++) {
                                const url = urls[i];
                                const urlTitle = `Link ${i+1}`;
                                const urlDomain = new URL(url).hostname;
                            %>
                                <a href="<%= url %>"
                                   class="btn btn-sm btn-outline-secondary"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   aria-label="External link to <%= urlDomain %>">
                                    🔗
                                </a>
                            <% } %>
                        </div>
                    <% } %>
                </td>

                <td class="listing-contributors">
                    <% if (contributors.length === 0) { %>
                        <span class="text-muted small">None</span>
                    <% } else { %>
                        <ul class="list-unstyled mb-0">
                            <% for (const contributor of contributors) { %>
                                <li><%= contributor %></li>
                            <% } %>
                        </ul>
                    <% } %>
                </td>
            </tr>
        <% }
        } %>
    </tbody>
</table>

<% if (items && items.length > 10) { %>
<nav aria-label="Table pagination">
    <ul class="pagination justify-content-center" id="table-pagination"></ul>
</nav>
<% } %>

<script>
// Initialize tooltips and table functionality after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize sorting functionality
        const projectList = new List('project-listing', options);

        // Add click handlers for sortable columns
        document.querySelectorAll('th.sortable').forEach(header => {
            header.addEventListener('click', function() {
                const sort = this.getAttribute('data-sort');
                projectList.sort(sort, { order: 'asc' });
            });
        });
    }

    // Add filter functionality
    document.querySelectorAll('[data-category]').forEach(catIcon => {
        catIcon.style.cursor = 'pointer';
        catIcon.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            // Implementation of filtering would go here
            console.log('Filter by category:', category);
        });
    });
});
</script>
```
