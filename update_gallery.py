import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
imports = """import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.png';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';
import img7 from './assets/7.jpg';
import img8 from './assets/8.png';"""
if "import img1" not in content:
    content = content.replace("import './App.css';", imports + "\nimport './App.css';")

# Replace gallery HTML
gallery_target = r'<div className="gallery-grid">.*?</div>\s*</div>\s*</section>'
gallery_replace = """<div className="gallery-grid">
            {[img1, img2, img3, img4, img5, img6, img7, img8].map((imgSrc, index) => (
              <motion.div 
                key={index}
                className={`gallery-item item-${index + 1}`} 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 0.1 * index }} 
                viewport={{ once: true }}
              >
                <img src={imgSrc} alt={`Gallery image ${index + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>"""

content = re.sub(gallery_target, gallery_replace, content, flags=re.DOTALL)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/App.css', 'r', encoding='utf-8') as f:
    css = f.read()

css_target_1 = """.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 350px 350px;
  gap: 1.5rem;
}"""
css_replace_1 = """.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 250px;
  gap: 1.5rem;
}"""

css_target_2 = """.item-1 { grid-column: 1 / 3; grid-row: 1 / 2; }
.item-2 { grid-column: 3 / 4; grid-row: 1 / 3; }
.item-3 { grid-column: 1 / 2; grid-row: 2 / 3; }
.item-4 { grid-column: 2 / 3; grid-row: 2 / 3; }"""
css_replace_2 = """.item-1 { grid-column: 1 / 3; grid-row: 1 / 3; }
.item-2 { grid-column: 3 / 4; grid-row: 1 / 2; }
.item-3 { grid-column: 4 / 5; grid-row: 1 / 3; }
.item-4 { grid-column: 3 / 4; grid-row: 2 / 3; }
.item-5 { grid-column: 1 / 2; grid-row: 3 / 4; }
.item-6 { grid-column: 2 / 4; grid-row: 3 / 5; }
.item-7 { grid-column: 4 / 5; grid-row: 3 / 5; }
.item-8 { grid-column: 1 / 2; grid-row: 4 / 5; }"""

css_target_3 = ".item-1, .item-2, .item-3, .item-4 {"
css_replace_3 = ".item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .item-7, .item-8 {"

css = css.replace(css_target_1, css_replace_1)
css = css.replace(css_target_2, css_replace_2)
css = css.replace(css_target_3, css_replace_3)

with open('src/App.css', 'w', encoding='utf-8') as f:
    f.write(css)
