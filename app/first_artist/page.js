<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Artiste</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --color-white: #FFFFFF;
            --color-dark-blue: #001028;
            --color-darker: #041828;
            --color-tan: #E5A773;
            --color-light-tan: #CBD893;
            --color-cream: #FFF8FA;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            color: var(--color-darker);
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px;
            background: white;
            box-shadow: 0 10px 50px rgba(0,0,0,0.1);
        }

        /* Header */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0 60px;
            border-bottom: 1px solid #eee;
        }

        .logo {
            font-size: 28px;
            font-weight: 700;
            color: var(--color-darker);
        }

        nav ul {
            display: flex;
            gap: 40px;
            list-style: none;
        }

        nav a {
            text-decoration: none;
            color: var(--color-darker);
            font-weight: 500;
            transition: color 0.3s;
        }

        nav a:hover {
            color: var(--color-tan);
        }

        .social-icons {
            display: flex;
            gap: 20px;
        }

        .social-icons a {
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-darker);
            color: white;
            border-radius: 50%;
            text-decoration: none;
            transition: transform 0.3s, background 0.3s;
        }

        .social-icons a:hover {
            transform: translateY(-3px);
            background: var(--color-tan);
        }

        /* Hero Section */
        .hero {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            padding: 80px 0;
            align-items: center;
        }

        .hero-image {
            position: relative;
        }

        .image-container {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .image-container img {
            width: 100%;
            height: 600px;
            object-fit: cover;
            display: block;
        }

        .image-accent {
            position: absolute;
            width: 200px;
            height: 200px;
            background: var(--color-light-tan);
            border-radius: 50%;
            top: -30px;
            right: -30px;
            z-index: -1;
        }

        .name-vertical {
            position: absolute;
            left: -60px;
            top: 50%;
            transform: translateY(-50%) rotate(-90deg);
            font-size: 80px;
            font-weight: 900;
            color: var(--color-darker);
            opacity: 0.1;
            letter-spacing: 10px;
        }

        .hero-content h1 {
            font-size: 64px;
            font-weight: 900;
            margin-bottom: 30px;
            color: var(--color-darker);
        }

        .hero-content p {
            line-height: 1.8;
            color: #666;
            margin-bottom: 20px;
            font-size: 16px;
        }

        .cta-button {
            display: inline-block;
            margin-top: 30px;
            padding: 18px 45px;
            background: var(--color-darker);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s;
            border: 2px solid var(--color-darker);
        }

        .cta-button:hover {
            background: white;
            color: var(--color-darker);
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        /* Gallery Section */
        .gallery-section {
            padding: 80px 0;
        }

        .gallery-section h2 {
            font-size: 48px;
            font-weight: 900;
            margin-bottom: 50px;
            color: var(--color-darker);
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .gallery-item {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            transition: transform 0.3s, box-shadow 0.3s;
            background: white;
            cursor: pointer;
        }

        .gallery-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        }

        .gallery-item img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            display: block;
        }

        .gallery-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,16,40,0.95));
            padding: 30px;
            transform: translateY(100%);
            transition: transform 0.3s;
        }

        .gallery-item:hover .gallery-overlay {
            transform: translateY(0);
        }

        .gallery-overlay h3 {
            color: white;
            font-size: 24px;
            margin-bottom: 10px;
        }

        .gallery-overlay p {
            color: var(--color-light-tan);
            font-size: 14px;
        }

        .view-all {
            text-align: center;
            margin-top: 50px;
        }

        .view-all a {
            color: var(--color-tan);
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            transition: color 0.3s;
        }

        .view-all a:hover {
            color: var(--color-darker);
        }

        /* Sidebar */
        .sidebar {
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 30px;
            padding: 20px;
            background: var(--color-cream);
            border-radius: 0 15px 15px 0;
            box-shadow: 5px 0 20px rgba(0,0,0,0.1);
        }

        .sidebar-link {
            writing-mode: vertical-rl;
            text-decoration: none;
            color: var(--color-darker);
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 2px;
            transition: color 0.3s;
        }

        .sidebar-link:hover {
            color: var(--color-tan);
        }

        @media (max-width: 1024px) {
            .hero {
                grid-template-columns: 1fr;
                gap: 50px;
            }

            .name-vertical {
                display: none;
            }

            .sidebar {
                display: none;
            }

            .gallery-grid {
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            }
        }

        @media (max-width: 768px) {
            .container {
                padding: 20px;
            }

            header {
                flex-direction: column;
                gap: 20px;
            }

            nav ul {
                gap: 20px;
                font-size: 14px;
            }

            .hero-content h1 {
                font-size: 42px;
            }

            .gallery-section h2 {
                font-size: 36px;
            }
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <a href="#" class="sidebar-link">CONTACT CV</a>
        <a href="#" class="sidebar-link">CLIENT REVIEWS</a>
        <a href="#" class="sidebar-link">MY PROCESS</a>
    </div>

    <div class="container">
        <header>
            <div class="logo">artiste.</div>
            <nav>
                <ul>
                    <li><a href="#portfolio">portfolio</a></li>
                    <li><a href="#about">à propos</a></li>
                    <li><a href="#galerie">galerie</a></li>
                    <li><a href="#reviews">avis</a></li>
                    <li><a href="#contact">contact</a></li>
                </ul>
            </nav>
            <div class="social-icons">
                <a href="#" aria-label="Twitter">T</a>
                <a href="#" aria-label="Pinterest">P</a>
                <a href="#" aria-label="Instagram">I</a>
                <a href="#" aria-label="LinkedIn">L</a>
                <a href="#" aria-label="YouTube">Y</a>
            </div>
        </header>

        <section class="hero">
            <div class="hero-image">
                <div class="name-vertical">artiste</div>
                <div class="image-container">
                    <div class="image-accent"></div>
                    <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1000&fit=crop" alt="Portrait de l'artiste">
                </div>
            </div>
            <div class="hero-content">
                <h1>Pourquoi Moi</h1>
                <p>Que les esprits d'articles n'aient jamais secrètement été assis. L'argent semble seul, regardez car notre vieille. Le poulet vieillit, avait tricoté une soirée saisissante et avait apporté de la richesse dans l'angle.</p>
                <p>Un conseil égaré dans ma voiture. Mademoiselle avait deux maisons mais savait qui était la voiture de sport, le sport était deux autres appels. Celui qui a livré pourtant la richesse écrite de sa lettre n'a pas été géniale.</p>
                <a href="#contact" class="cta-button">planifier un appel</a>
            </div>
        </section>

        <section class="gallery-section" id="galerie">
            <h2>Dernières Œuvres</h2>
            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop" alt="Tableau 1">
                    <div class="gallery-overlay">
                        <h3>Abstraction Nocturne</h3>
                        <p>Acrylique sur toile - 2024</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop" alt="Tableau 2">
                    <div class="gallery-overlay">
                        <h3>Harmonie Dorée</h3>
                        <p>Technique mixte - 2024</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=800&fit=crop" alt="Tableau 3">
                    <div class="gallery-overlay">
                        <h3>Lumière Intérieure</h3>
                        <p>Huile sur toile - 2024</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=800&fit=crop" alt="Tableau 4">
                    <div class="gallery-overlay">
                        <h3>Fragments d'Émotion</h3>
                        <p>Collage et acrylique - 2024</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=800&fit=crop" alt="Tableau 5">
                    <div class="gallery-overlay">
                        <h3>Rêverie Bleue</h3>
                        <p>Aquarelle - 2024</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1582561424760-0321c3a2cc83?w=800&h=800&fit=crop" alt="Tableau 6">
                    <div class="gallery-overlay">
                        <h3>Écho Moderne</h3>
                        <p>Acrylique sur bois - 2024</p>
                    </div>
                </div>
            </div>
            <div class="view-all">
                <a href="#all">voir tout →</a>
            </div>
        </section>
    </div>

    <script>
        // Animation au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s, transform 0.6s';
            observer.observe(item);
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>