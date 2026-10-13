import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Navbar and add top bar
nav_target = """    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">The Lumina</div>"""

nav_replace = """    <>
      <header className={`header-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="top-bar text-sans">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>📍 No.80/1 Ampitiya Road, Tennakumbura, Kandy, Sri Lanka</span>
            <span className="hide-mobile">reservations@godamunnevilla.com</span>
          </div>
        </div>
        <nav className="navbar">
          <div className="nav-logo">
            <img src="/logo.png" alt="Godamunne Villa Kandy" style={{ height: '70px', objectFit: 'contain' }} />
          </div>"""
content = content.replace(nav_target, nav_replace)

# Close header tag
content = content.replace("</nav>\n\n      <section", "</nav>\n      </header>\n\n      <section")

# 2. Add Map section above Inquiry
map_section = """      </section>

      <section id="location" className="section-padding">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ marginBottom: '3rem', textAlign: 'center' }}
          >
            <h2 className="text-serif" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Location</h2>
            <p className="text-sans" style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>No.80/1 Ampitiya Road, Tennakumbura, Kandy, Sri Lanka</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            style={{ width: '100%', height: '450px', overflow: 'hidden' }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3ae366266498acd3%3A0x411a3818a1e03c35!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) contrast(1.1) opacity(0.8)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </motion.div>
        </div>
      </section>

      <section id="inquiry\""""

content = content.replace("      </section>\n\n      <section id=\"inquiry\"", map_section)

# 3. Global text replacements
content = content.replace("The Lumina Hotel", "Godamunne Villa Kandy")
content = content.replace("The Lumina", "Godamunne Villa Kandy")
content = content.replace("reservations@thelumina.com", "reservations@godamunnevilla.com")
content = content.replace("Lumina Penthouse", "Godamunne Penthouse")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
