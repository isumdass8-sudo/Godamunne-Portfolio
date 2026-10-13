import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X, ChevronLeft, ChevronRight } from 'lucide-react';
import logoImage from './assets/logo.png';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.png';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';
import img7 from './assets/7.png';
import img8 from './assets/8.jpg';
import exImg from './assets/Ex.png';
import disImg from './assets/Dis.png';
import bgImage from './assets/BG.png';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAttractions, setShowAttractions] = useState(false);
  const [formResult, setFormResult] = useState("");
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [showAllSuites, setShowAllSuites] = useState(false);

  const attractions = [
    { title: "Sri Dalada Maligawa", desc: "Kandy's most important cultural and religious landmark, housing the Sacred Tooth Relic." },
    { title: "Kandy Lake", desc: "A scenic lake perfect for walking and relaxing around the city centre." },
    { title: "Kandy View Point / Arthur's Seat", desc: "Enjoy panoramic views of Kandy and the surrounding lush hills." },
    { title: "Udawatta Kele Sanctuary", desc: "Historic forest reserve offering trails, birds, wildlife and nature walks." },
    { title: "Bahirawakanda Vihara Buddha", desc: "A large, striking Buddha statue providing excellent city views from the hilltop." },
    { title: "Kandy National Museum", desc: "Delve into Kandyan history, unique culture, and heritage." },
    { title: "International Buddhist Museum", desc: "Explore Buddhist history and exhibits gathered from different countries." },
    { title: "Royal Palace Park", desc: "A serene, historic royal area featuring beautifully maintained gardens." },
    { title: "Kandyan Cultural Centre", desc: "Experience traditional Kandyan dance, drumming, and spectacular cultural performances." },
    { title: "Ceylon Tea Museum", desc: "Learn about Sri Lanka's rich tea history and enjoy sweeping hill-country views." },
    { title: "Royal Botanic Gardens, Peradeniya", desc: "A massive, renowned botanical garden showcasing tropical plants and famous avenues." },
    { title: "Kandy Garrison Cemetery", desc: "A peaceful and historic colonial-era cemetery." },
    { title: "Old Royal Palace", desc: "The historical site connected to the former Kingdom of Kandy." },
    { title: "Kandy Lake View Point", desc: "Another spectacular and highly scenic viewpoint around the famous lake." }
  ];
  const roomsRef = useRef(null);
  const suitesRef = useRef(null);
  const { scrollY } = useScroll();
  
  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = window.innerWidth > 768 ? ref.current.clientWidth / 2 : ref.current.clientWidth * 0.8;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
  
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (selectedRoom || selectedImage || showAttractions) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRoom, selectedImage, showAttractions]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const onSubmitInquiry = async (event) => {
    event.preventDefault();
    setFormResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "c07e7014-9354-4ec8-b71a-dffae2f34f9e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormResult("Thank you! Your inquiry has been sent successfully.");
        event.target.reset();
      } else {
        console.error("Error", data);
        setFormResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setFormResult("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <header className={`header-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="top-bar text-sans">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>📍 No.80/1 Ampitiya Road, Tennakumbura, Kandy, Sri Lanka</span>
            <span className="hide-mobile">reservations@godamunnevilla.com &nbsp;&nbsp;|&nbsp;&nbsp; +94 77 784 1760</span>
          </div>
        </div>
        <nav className="navbar">
          <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={logoImage} alt="Godamunne Villa Logo" style={{ height: '60px', objectFit: 'contain', borderRadius: '4px' }} />
            <span>Godamunne Villa Kandy</span>
          </div>
        <ul className="nav-links">
          <li><a href="#about" className="nav-link">Our Story</a></li>
          <li><a href="#rooms" className="nav-link">Rooms</a></li>
          <li><a href="#wellness" className="nav-link">Experience</a></li>
          <li><a href="#gallery" className="nav-link">Gallery</a></li>
          <li><a href="#location" className="nav-link">Location</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="book-btn" onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })}>Reserve</button>
          <button className="mobile-menu" style={{ display: 'none', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            <Menu />
          </button>
        </div>
      </nav>
      </header>

      <section className="hero">
        <motion.img 
          src={bgImage} 
          alt="Godamunne Villa Kandy Exterior at Golden Hour" 
          className="hero-img"
          style={{ y: heroY }}
        />
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <span className="hero-subtitle">Welcome to unparalleled luxury</span>
          <h1 className="hero-title">Where time<br />stands still.</h1>
        </motion.div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <section id="about" className="section-padding">
        <div className="container about-grid">
          <motion.div 
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-serif text-accent" style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: 1.1 }}>
              A private retreat<br/>in the heart of Kandy.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '1.25rem', color: 'var(--color-text)', maxWidth: '600px', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
              Nestled amidst the tranquil beauty of Kandy, Godamunne Villa is a peaceful escape where contemporary comfort meets the warmth of Sri Lankan hospitality. Surrounded by lush greenery and the timeless charm of the hills, our villa offers an intimate setting to relax, reconnect, and experience Kandy at your own pace.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '550px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Every detail has been thoughtfully designed to create a stay that feels effortless, elegant, and personal — from quiet mornings to unforgettable evenings.
            </motion.p>
            <motion.div variants={fadeUp} style={{ paddingLeft: '1.5rem', borderLeft: '2px solid var(--color-accent)', margin: '3rem 0 2rem' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--color-text)', lineHeight: 1.4, fontFamily: 'var(--font-serif)' }}>
                "Come for the beauty of Kandy.<br />Stay for the feeling of home."
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeUp} 
              style={{ 
                marginTop: '4rem', 
                marginBottom: '4rem', 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                maxWidth: '750px'
              }}
            >
              <div style={{ padding: '2.5rem 2rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderTop: '3px solid var(--color-accent)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', color: 'var(--color-accent)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  <span style={{ fontSize: '1.4rem' }}>🌿</span> Vision
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.8, fontWeight: 300 }}>
                  To be Kandy’s most cherished villa retreat, where comfort, tranquility, and the beauty of nature create unforgettable memories.
                </p>
              </div>
              
              <div style={{ padding: '2.5rem 2rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderTop: '3px solid var(--color-accent)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', color: 'var(--color-accent)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  <span style={{ fontSize: '1.4rem' }}>✨</span> Mission
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.8, fontWeight: 300 }}>
                  To provide exceptional hospitality, peaceful surroundings, and personalized care, making every guest feel at home and every stay truly special.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="signature">
              Godamunne Villa Kandy
              <span style={{ display: 'block', fontSize: '0.85rem', fontStyle: 'normal', color: 'var(--color-text-muted)', marginTop: '0.75rem', fontFamily: 'var(--font-sans)', letterSpacing: '2px', textTransform: 'uppercase' }}>Your tranquil escape in the hills</span>
            </motion.div>
          </motion.div>
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src="/lounge.jpg" alt="Lounge Area" className="about-img" />
            <img src="/room.jpg" alt="Interior Details" className="about-img-accent" />
          </motion.div>
        </div>
      </section>

      <section id="rooms" className="suites section-padding">
        <div className="container">
          <motion.div 
            className="suites-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-serif">Rooms</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {!showAllRooms && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="slider-btn" onClick={() => scrollContainer(roomsRef, 'left')} aria-label="Scroll left"><ChevronLeft size={20} /></button>
                  <button className="slider-btn" onClick={() => scrollContainer(roomsRef, 'right')} aria-label="Scroll right"><ChevronRight size={20} /></button>
                </div>
              )}
              <a 
                href="#rooms" 
                className="link-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowAllRooms(!showAllRooms);
                }}
              >
                {showAllRooms ? "Show Less" : "View All Rooms"}
              </a>
            </div>
          </motion.div>
          
          <div className={`suites-grid ${showAllRooms ? 'expanded' : ''}`} ref={roomsRef}>
            {[
              { title: "Deluxe King Room", size: "45 SQM", view: "Garden View", img: "/room.jpg", description: "Experience ultimate comfort in our Deluxe King Room, featuring a plush king-size bed, elegant furnishings, and stunning views of the lush gardens.", amenities: ["King Bed", "Free Wi-Fi", "Mini Bar", "Air Conditioning", "Room Service"] },
              { title: "Premium Twin Room", size: "50 SQM", view: "City View", img: "/lounge.jpg", description: "Perfect for friends or colleagues, the Premium Twin Room offers two comfortable beds, a spacious work area, and panoramic city views.", amenities: ["Two Twin Beds", "Free Wi-Fi", "Work Desk", "Air Conditioning", "Flat-screen TV"] },
              { title: "Executive Room", size: "60 SQM", view: "Pool View", img: "/hero.jpg", description: "Our Executive Room is designed for the discerning traveler, offering exclusive access to the Executive Lounge, a spacious seating area, and serene pool views.", amenities: ["King Bed", "Lounge Access", "Coffee Machine", "Air Conditioning", "Bathtub"] },
              { title: "Family Room", size: "75 SQM", view: "Garden View", img: "/room.jpg", description: "Ideal for family getaways, this spacious room features a master bedroom and a separate sleeping area for children, ensuring privacy and comfort for all.", amenities: ["King Bed & Twin Beds", "Free Wi-Fi", "Kids Play Area", "Air Conditioning", "Two Bathrooms"] },
              { title: "Standard Room", size: "35 SQM", view: "City View", img: "/lounge.jpg", description: "A cozy and elegant retreat featuring modern amenities, a comfortable queen-size bed, and everything you need for a relaxing stay in the heart of the city.", amenities: ["Queen Bed", "Free Wi-Fi", "Walk-in Shower", "Air Conditioning", "Room Service"] }
            ].map((room, index) => (
              <motion.div 
                key={index}
                className="suite-card"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="suite-img-wrapper">
                  <img src={room.img} alt={room.title} />
                </div>
                <h3 className="suite-title text-serif">{room.title}</h3>
                <div className="suite-meta text-sans" style={{ marginBottom: '1.5rem' }}>
                  <span>{room.size}</span>
                  <span>{room.view}</span>
                </div>
                <button 
                  className="link-btn" 
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', display: 'inline-block' }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Inquire Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section id="wellness" className="wellness section-padding">
        <div className="container wellness-grid">
          <motion.div 
            className="wellness-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-serif text-accent" style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: 1.1 }}>
              Experience Kandy.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '1.25rem', color: 'var(--color-text)', maxWidth: '600px', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
              Discover the beauty of Kandy from the comfort of Godamunne Villa. Surrounded by tranquil greenery and the timeless charm of the hill country, our villa offers a peaceful setting to slow down, relax, and enjoy meaningful moments.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '550px', lineHeight: 1.8, marginBottom: '3rem' }}>
              From quiet mornings to exploring the cultural heart of Kandy, every stay offers an opportunity to experience Sri Lanka at your own pace.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button 
                className="link-btn" 
                style={{ color: 'var(--color-text)', letterSpacing: '3px', fontWeight: 500, fontSize: '0.9rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', borderBottom: '1px solid var(--color-accent)', paddingBottom: '0.25rem' }}
                onClick={() => setShowAttractions(true)}
              >
                EXPLORE KANDY &rarr;
              </button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="wellness-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src={exImg} alt="Experience Kandy" className="wellness-img" />
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="gallery section-padding">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ marginBottom: '4rem', textAlign: 'center' }}
          >
            <h2 className="text-serif" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Gallery</h2>
            <p className="text-sans" style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>Moments frozen in time.</p>
          </motion.div>
          <div className="gallery-grid">
            {[img1, img2, img3, img4, img5, img6, img7, img8].map((imgSrc, index) => (
              <motion.div 
                key={index}
                className={`gallery-item item-${index + 1}`} 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 0.1 * index }} 
                viewport={{ once: true }}
                onClick={() => setSelectedImage(imgSrc)}
                style={{ cursor: 'pointer' }}
              >
                <img src={imgSrc} alt={`Gallery image ${index + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
          <div style={{ width: '100%', height: '450px', overflow: 'hidden' }}>
            <iframe 
              src="https://maps.google.com/maps?q=Godamunne%20Villa%20Kandy,%20Sri%20Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>

      <section id="inquiry" className="section-padding inquiry-section">
        <div className="container inquiry-grid">
          <motion.div 
            className="inquiry-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-serif">Begin your journey.</h2>
            <p>Connect with our concierge to tailor your upcoming stay or inquire about exclusive experiences.</p>
          </motion.div>
          <motion.form 
            className="inquiry-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={onSubmitInquiry}
          >
            <div className="form-group">
              <input type="text" name="name" className="form-input" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="email" className="form-input" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="text" name="dates" className="form-input" placeholder="Preferred Dates (Optional)" />
            </div>
            <div className="form-group">
              <textarea name="message" className="form-input" placeholder="How can we assist you?" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Inquiry</button>
            {formResult && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                style={{ display: 'block', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-accent)' }}
              >
                {formResult}
              </motion.span>
            )}
          </motion.form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="footer-logo">Godamunne Villa Kandy</div>
              <p className="footer-text">
                An award-winning boutique destination redefining modern luxury through impeccable design and intuitive service.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul className="footer-links">
                <li><a href="#about">Our Story</a></li>
                <li><a href="#rooms">Rooms</a></li>
                <li><a href="#suites">Suites</a></li>
                <li><a href="#wellness">Experience Kandy</a></li>
                <li><a href="#">Private Events</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul className="footer-links">
                <li><a href="#">No.80/1 Ampitiya Road, Kandy</a></li>
                <li><a href="#">reservations@godamunnevilla.com</a></li>
                <li><a href="#">+94 77 784 1760</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom text-sans">
            <p>&copy; {new Date().getFullYear()} Godamunne Villa Kandy. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <X size={32} />
            </button>
            <motion.img 
              src={selectedImage} 
              alt="Enlarged gallery view" 
              className="lightbox-img"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
        
        {selectedRoom && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRoom(null)}
          >
            <button className="lightbox-close" onClick={() => setSelectedRoom(null)}>
              <X size={32} />
            </button>
            <motion.div 
              className="room-modal"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="room-modal-img-container">
                <img src={selectedRoom.img} alt={selectedRoom.title} className="room-modal-img" />
              </div>
              <div className="room-modal-content">
                <h3 className="text-serif room-modal-title">{selectedRoom.title}</h3>
                <div className="suite-meta text-sans" style={{ color: 'var(--color-accent)', marginBottom: '2rem', justifyContent: 'flex-start', gap: '2rem', fontWeight: 500 }}>
                  <span>{selectedRoom.metaText || selectedRoom.size}</span>
                  {!selectedRoom.metaText && <span>{selectedRoom.view}</span>}
                </div>
                <p className="room-modal-desc">{selectedRoom.description}</p>
                
                <div className="amenities-divider"></div>
                
                <h4 className="text-sans">Room Amenities</h4>
                <ul className="room-modal-amenities text-sans">
                  {selectedRoom.amenities.map((item, i) => (
                    <li key={i}>
                      <span className="amenity-dot"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="modal-inquire-btn text-sans" 
                  onClick={() => {
                    setSelectedRoom(null);
                    setTimeout(() => {
                      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                >
                  Inquire About This Room
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAttractions && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAttractions(false)}
          >
            <button className="lightbox-close" onClick={() => setShowAttractions(false)}>
              <X size={32} />
            </button>
            <motion.div 
              className="attractions-modal"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="attractions-left">
                <img src={disImg} alt="Kandy Attractions" className="attractions-bg" />
                <div className="attractions-left-content">
                  <h3 className="text-serif">Discover Kandy</h3>
                  <p className="text-sans">Explore the rich heritage and natural beauty surrounding our villa.</p>
                </div>
              </div>
              <div className="attractions-right">
                <div className="attractions-list">
                  {attractions.map((item, i) => (
                    <div key={i} className="attraction-list-item">
                      <div className="attraction-number text-serif">{(i + 1).toString().padStart(2, '0')}</div>
                      <div className="attraction-details">
                        <h4 className="text-serif">{item.title}</h4>
                        <p className="text-sans">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
