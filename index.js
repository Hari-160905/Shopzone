import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hari@2005!", 
    database: "shop_zone"
});


const sampleProducts = [
    {
        name: 'Red Shirt',
        price: 149.99,
        button: 'VIEW',
        image_url: 'https://i5.walmartimages.com/seo/Mens-Dress-Shirts-Casual-Solid-Color-Long-Sleeve-Shirts-Lightweight-Comfort-Button-Up-Shirts-Plain-Wrinkle-Free-Business-Shirt_3175e32e-9daf-40b9-a02b-1adbe05f1db6.62bd1881a941cdffa5ccdfaa1fe1ae0e.jpeg',
        extras: [
            'https://i5.walmartimages.com/seo/Mens-Dress-Shirts-Casual-Solid-Color-Long-Sleeve-Shirts-Lightweight-Comfort-Button-Up-Shirts-Plain-Wrinkle-Free-Business-Shirt_3175e32e-9daf-40b9-a02b-1adbe05f1db6.62bd1881a941cdffa5ccdfaa1fe1ae0e.jpeg',
            'https://i5.walmartimages.com/seo/Mens-Dress-Shirts-Casual-Solid-Color-Long-Sleeve-Shirts-Lightweight-Comfort-Button-Up-Shirts-Plain-Wrinkle-Free-Business-Shirt_3175e32e-9daf-40b9-a02b-1adbe05f1db6.62bd1881a941cdffa5ccdfaa1fe1ae0e.jpeg'
        ]
    },
    {
        name: 'Blue Jeans',
        price: 249.99,
        button: 'VIEW',
        image_url: 'https://5.imimg.com/data5/SELLER/Default/2023/6/318276280/MN/NI/JG/121250112/new-product-500x500.jpeg',
        extras: [
            'https://5.imimg.com/data5/SELLER/Default/2023/6/318276280/MN/NI/JG/121250112/new-product-500x500.jpeg',
            'https://5.imimg.com/data5/SELLER/Default/2023/6/318276280/MN/NI/JG/121250112/new-product-500x500.jpeg'
        ]
    },
    {
        name: 'Sneakers',
        price: 399.99,
        button: 'VIEW',
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        extras: [
            'https://images.unsplash.com/photo-1595777707802-21b287ae8e4b?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop'
        ]
    },
    {
        name: 'Watch',
        price: 999.99,
        button: 'VIEW',
        image_url: 'https://img.lazcdn.com/g/p/9ca5a7785071a6e6c7716f0635655c24.jpg_720x720q80.jpg',
        extras: [
            'https://img.lazcdn.com/g/p/9ca5a7785071a6e6c7716f0635655c24.jpg_720x720q80.jpg',
            'https://img.lazcdn.com/g/p/9ca5a7785071a6e6c7716f0635655c24.jpg_720x720q80.jpg'
        ]
    },
    {
        name: 'Hat',
        price: 79.99,
        button: 'VIEW',
        image_url: 'https://www.realmenrealstyle.com/wp-content/uploads/2023/11/The-Akubra-hat-necktie-gray-suit-741x505.jpg',
        extras: [
            'https://www.realmenrealstyle.com/wp-content/uploads/2023/11/The-Akubra-hat-necktie-gray-suit-741x505.jpg',
            'https://www.realmenrealstyle.com/wp-content/uploads/2023/11/The-Akubra-hat-necktie-gray-suit-741x505.jpg'
        ]
    },
    {
        name: 'Sunglasses',
        price: 199.99,
        button: 'VIEW',
        image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
        extras: [
            'https://images.unsplash.com/photo-1516978080064-9abb07efd56e?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop'
        ]
    },
    {
        name: 't-shirt',
        price: 599.99,
        button: 'VIEW',
        image_url: 'https://m.media-amazon.com/images/I/71RrfJ8q72L._AC_SL1500_.jpg',
        extras: [
            'https://m.media-amazon.com/images/I/71RrfJ8q72L._AC_SL1500_.jpg',
            'https://m.media-amazon.com/images/I/71RrfJ8q72L._AC_SL1500_.jpg'
        ]
    },
    {
        name: 'Backpack',
        price: 349.99,
        button: 'VIEW',
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        extras: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
        ]
    }
];


const extraImagesByName = {};

function seedProducts() {
    sampleProducts.forEach(p => {
       
        extraImagesByName[p.name] = p.extras;

        db.query('SELECT id FROM products WHERE name = ?', [p.name], (err, results) => {
            if (err) {
                console.error('Seed select error for', p.name, err);
                return;
            }
            if (results.length === 0) {
                db.query(
                    'INSERT INTO products (name, price, button, image_url) VALUES (?, ?, ?, ?)',
                    [p.name, p.price, p.button, p.image_url],
                    (e) => {
                        if (e) console.error('Seed insert error for', p.name, e);
                        else console.log(`Inserted sample product "${p.name}"`);
                    }
                );
            } else {
                console.log(`Product "${p.name}" already exists`);
            }
        });
    });
}

// connect to the database and then seed
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database successfully!");
    seedProducts();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Add CORS headers and security headers for image loading
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Referrer-Policy', 'no-referrer');
    next();
});

var userIsAuthorised = false;

function passwordCheck(req, res, next) {
    const password = req.body["password"];
    const username = req.body["username"];
    if (password === "hariharan" && username === "karur") {
        userIsAuthorised = true;
    }
    next();
}


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/check", passwordCheck, (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(path.join(__dirname, "public", "main.html"));
    } else {
        res.redirect("/"); 
    }
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"));
});

app.get("/trending", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "trending.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "contact.html"));
});


app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cart.html"));
});


app.post('/submit-contact', (req, res) => {
    const { zonename } = req.body;
    console.log('Received contact form for zone:', zonename);
    res.send(`<p>Thanks for contacting us about <strong>${zonename}</strong>.</p><p><a href="/home">Return home</a></p>`);
});


app.get("/api/topbuys", (req, res) => {
    // return up to eight products treated as "top buys"
    const sql = "SELECT * FROM products LIMIT 8";
    db.query(sql, (err, results) => {
        console.log('Top buys query - Error:', err, 'Results:', results);
        if (err) return res.status(500).json({ error: err.message });

        const productsObj = {};
        results.forEach(row => {
            // build image list, including any extras defined in the map
            const imgs = [row.image_url];
            const extras = extraImagesByName[row.name];
            if (extras && extras.length) imgs.push(...extras);

            productsObj[row.id] = {
                name: row.name,
                price: parseFloat(row.price),
                button: row.button,
                images: imgs
            };
        });
        console.log('Sending products:', productsObj);
        res.json(productsObj);
    });
});


app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM products WHERE id = ?";
    
    db.query(sql, [productId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const row = results[0];
            const imgs = [row.image_url];
            const extras = extraImagesByName[row.name];
            if (extras && extras.length) imgs.push(...extras);

            res.json({
                name: row.name,
                price: row.price,
                button: "BUY NOW", 
                images: imgs
            });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    });
});

// Image proxy endpoint to avoid CORS issues
app.get("/api/image", async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).json({ error: "URL parameter required" });
    }
    
    try {
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch image" });
        }
        
        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.send(Buffer.from(buffer));
    } catch (err) {
        console.error('Image proxy error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});