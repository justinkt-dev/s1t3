// Dynamic Search Configuration
// This file automatically discovers and indexes all blog content

class SearchIndex {
  constructor() {
    this.pages = [];
    this.categories = {
      'certifications': 'Certifications',
      'linux': 'Linux',
      'geotech': 'GeoTech',
      'walkthroughs': 'Walkthroughs'
    };
  }

  // Auto-discover all blog content
  async discoverContent() {
    const basePages = [
      { title: 'About', url: 'about/about.html', fetch: 'about/about.html', category: 'core' },
      { title: 'Blog', url: 'blog/blog.html', fetch: 'blog/blog.html', category: 'core' },
      { title: 'Home', url: 'index.html', fetch: 'index.html', category: 'core' }
    ];

    // Define all known blog posts with their categories
    const blogPosts = [
      // Certifications (most recent content)
      { title: 'Cyber Journey', url: 'blog/certifications/cyber-journey.html', fetch: 'blog/certifications/cyber-journey.html', category: 'certifications', keywords: ['cyber', 'journey', 'certification', 'career'] },
      { title: 'ProLabs Review', url: 'blog/certifications/prolabs-review.html', fetch: 'blog/certifications/prolabs-review.html', category: 'certifications', keywords: ['prolabs', 'hackthebox', 'enterprise', 'networks'] },
      { title: 'THM Offensive Pentest', url: 'blog/certifications/thm-offpentest.html', fetch: 'blog/certifications/thm-offpentest.html', category: 'certifications', keywords: ['tryhackme', 'offensive', 'pentest', 'thm'] },
      { title: 'THM Pentest', url: 'blog/certifications/thm-pentest.html', fetch: 'blog/certifications/thm-pentest.html', category: 'certifications', keywords: ['tryhackme', 'pentest', 'thm'] },
      { title: 'THM Red Teaming', url: 'blog/certifications/thm-redteaming.html', fetch: 'blog/certifications/thm-redteaming.html', category: 'certifications', keywords: ['tryhackme', 'red', 'teaming', 'thm'] },
      
      // Linux content (recent focus)
      { title: 'Linux Resources', url: 'blog/linux/linux-resources.html', fetch: 'blog/linux/linux-resources.html', category: 'linux', keywords: ['linux', 'resources', 'rh124', 'rh134', 'do457'] },
      { title: 'ldmtool Guide', url: 'blog/linux/ldmtool.html', fetch: 'blog/linux/ldmtool.html', category: 'linux', keywords: ['ldmtool', 'linux', 'device', 'mapper', 'lvm'] },
      { title: 'Arch vs Pop!_OS', url: 'blog/linux/arch-vs-pop.html', fetch: 'blog/linux/arch-vs-pop.html', category: 'linux', keywords: ['arch', 'popos', 'linux', 'distribution', 'comparison'] },
      
      // GeoTech content
      { title: 'ArcGIS Web Apps', url: 'blog/geotech/arcgis-webapps.html', fetch: 'blog/geotech/arcgis-webapps.html', category: 'geotech', keywords: ['arcgis', 'web', 'apps', 'geospatial'] },
      { title: 'ArcGIS Feature Services', url: 'blog/geotech/arcgis-featureservices.html', fetch: 'blog/geotech/arcgis-featureservices.html', category: 'geotech', keywords: ['arcgis', 'feature', 'services', 'geospatial'] },
      { title: 'ArcGIS Printing', url: 'blog/geotech/arcgis-printing.html', fetch: 'blog/geotech/arcgis-printing.html', category: 'geotech', keywords: ['arcgis', 'printing', 'geospatial'] },
      
      // Walkthroughs
      { title: 'TryHackMe Beginner', url: 'blog/walkthroughs/tryhackme-beginner.html', fetch: 'blog/walkthroughs/tryhackme-beginner.html', category: 'walkthroughs', keywords: ['tryhackme', 'beginner', 'walkthrough'] }
    ];

    // Combine all pages
    this.pages = [...basePages, ...blogPosts.map(post => ({
      title: `Blog - ${post.title}`,
      url: post.url,
      fetch: post.fetch,
      category: post.category,
      keywords: post.keywords || []
    }))];

    console.log(`Search index loaded with ${this.pages.length} pages across ${Object.keys(this.categories).length} categories`);
    return this.pages;
  }

  // Enhanced search with category filtering and keyword matching
  async search(query, category = null) {
    const results = [];
    const q = query.toLowerCase();
    
    for (const page of this.pages) {
      // Skip if category filter is applied and doesn't match
      if (category && page.category !== category) continue;
      
      try {
        const res = await fetch(page.fetch);
        const html = await res.text();
        
        // Check content match
        const contentMatch = html.toLowerCase().includes(q);
        
        // Check keyword match
        const keywordMatch = page.keywords && page.keywords.some(keyword => 
          keyword.toLowerCase().includes(q) || q.includes(keyword.toLowerCase())
        );
        
        if (contentMatch || keywordMatch) {
          results.push({
            ...page,
            matchType: keywordMatch ? 'keyword' : 'content',
            relevance: this.calculateRelevance(page, q, keywordMatch)
          });
        }
      } catch(e) {
        console.warn(`Failed to fetch ${page.fetch}:`, e);
      }
    }
    
    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
  }

  // Calculate search relevance score
  calculateRelevance(page, query, keywordMatch) {
    let score = 0;
    
    // Title match gets highest score
    if (page.title.toLowerCase().includes(query)) score += 10;
    
    // Keyword match gets high score
    if (keywordMatch) score += 8;
    
    // Category relevance
    if (page.category === 'certifications' && ['prolabs', 'thm', 'tryhackme'].some(term => query.includes(term))) score += 5;
    if (page.category === 'linux' && ['linux', 'ldmtool', 'arch', 'popos'].some(term => query.includes(term))) score += 5;
    if (page.category === 'geotech' && ['arcgis', 'geospatial'].some(term => query.includes(term))) score += 5;
    
    return score;
  }

  // Get all categories for filtering
  getCategories() {
    return this.categories;
  }

  // Get pages by category
  getPagesByCategory(category) {
    return this.pages.filter(page => page.category === category);
  }
}

// Export for use in search.html
window.SearchIndex = SearchIndex;
