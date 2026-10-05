```javascript
/* =========================================================
   ثلج و رمان — Main JavaScript
   WebFoundry
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LANGUAGE SYSTEM
       ===================================================== */

    const languageToggle = document.getElementById("languageToggle");

    let currentLanguage = localStorage.getItem("language") || "ar";

    function updateLanguage() {

        const elements = document.querySelectorAll("[data-ar][data-en]");

        elements.forEach((element) => {

            if (currentLanguage === "ar") {
                element.textContent = element.dataset.ar;
            } else {
                element.textContent = element.dataset.en;
            }

        });

        document.documentElement.lang = currentLanguage;

        if (currentLanguage === "ar") {
            document.documentElement.dir = "rtl";
            document.body.classList.remove("english");

            if (languageToggle) {
                languageToggle.textContent = "EN";
                languageToggle.setAttribute(
                    "aria-label",
                    "Switch to English"
                );
            }

        } else {

            document.documentElement.dir = "ltr";
            document.body.classList.add("english");

            if (languageToggle) {
                languageToggle.textContent = "AR";
                languageToggle.setAttribute(
                    "aria-label",
                    "التبديل إلى العربية"
                );
            }
        }
    }


    if (languageToggle) {

        languageToggle.addEventListener("click", () => {

            currentLanguage =
                currentLanguage === "ar"
                    ? "en"
                    : "ar";

            localStorage.setItem(
                "language",
                currentLanguage
            );

            updateLanguage();
        });
    }


    updateLanguage();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileNav =
        document.getElementById("mobileNav");


    if (mobileMenuButton && mobileNav) {

        mobileMenuButton.addEventListener("click", () => {

            mobileNav.classList.toggle("active");

            const isOpen =
                mobileNav.classList.contains("active");

            mobileMenuButton.textContent =
                isOpen ? "×" : "☰";

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        const mobileLinks =
            mobileNav.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

                mobileMenuButton.textContent = "☰";

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }


    /* =====================================================
       FEATURED PRODUCTS
       ===================================================== */

    const featuredContainer =
        document.getElementById("featuredProducts");


    /*
       These are fallback products.

       When we build menu.html, the real products
       from the client's menu can be connected here.
    */

    const featuredProducts = [

        {
            nameAr: "عصير رمان",
            nameEn: "Pomegranate Juice",

            descriptionAr:
                "عصير رمان منعش بطعم غني ومميز.",

            descriptionEn:
                "Refreshing pomegranate juice with a rich flavor.",

            price: "—",

            categoryAr: "عصائر",
            categoryEn: "Juices",

            image: "assets/products/pomegranate.jpg"
        },

        {
            nameAr: "ميلك شيك",
            nameEn: "Milkshake",

            descriptionAr:
                "ميلك شيك كريمي ولذيذ.",

            descriptionEn:
                "Rich and creamy milkshake.",

            price: "—",

            categoryAr: "ميلك شيك",
            categoryEn: "Milkshakes",

            image: "assets/products/milkshake.jpg"
        },

        {
            nameAr: "سلاش",
            nameEn: "Slush",

            descriptionAr:
                "مشروب بارد ومنعش بنكهات مميزة.",

            descriptionEn:
                "Cold and refreshing slush with delicious flavors.",

            price: "—",

            categoryAr: "سلاش",
            categoryEn: "Slush",

            image: "assets/products/slush.jpg"
        },

        {
            nameAr: "كوكتيل",
            nameEn: "Cocktail",

            descriptionAr:
                "خلطة فواكه منعشة ومميزة.",

            descriptionEn:
                "A refreshing signature fruit blend.",

            price: "—",

            categoryAr: "كوكتيلات",
            categoryEn: "Cocktails",

            image: "assets/products/cocktail.jpg"
        }

    ];


    function createProductCard(product) {

        const card =
            document.createElement("article");

        card.className = "product-card";


        const imageContainer =
            document.createElement("div");

        imageContainer.className =
            "product-image";


        const image =
            document.createElement("img");

        image.src = product.image;

        image.alt =
            currentLanguage === "ar"
                ? product.nameAr
                : product.nameEn;


        image.onerror = () => {

            image.style.display = "none";

            imageContainer.innerHTML =
                `<span class="product-placeholder">
                    ${currentLanguage === "ar"
                        ? "صورة المنتج"
                        : "Product Image"}
                </span>`;
        };


        imageContainer.appendChild(image);


        const info =
            document.createElement("div");

        info.className = "product-info";


        const name =
            document.createElement("h3");

        name.className = "product-name";

        name.textContent =
            currentLanguage === "ar"
                ? product.nameAr
                : product.nameEn;


        const description =
            document.createElement("p");

        description.className =
            "product-description";

        description.textContent =
            currentLanguage === "ar"
                ? product.descriptionAr
                : product.descriptionEn;


        const bottom =
            document.createElement("div");

        bottom.className =
            "product-bottom";


        const price =
            document.createElement("span");

        price.className =
            "product-price";

        price.textContent =
            product.price === "—"
                ? "—"
                : `${product.price} SAR`;


        const category =
            document.createElement("span");

        category.className =
            "product-category";

        category.textContent =
            currentLanguage === "ar"
                ? product.categoryAr
                : product.categoryEn;


        bottom.appendChild(price);
        bottom.appendChild(category);

        info.appendChild(name);
        info.appendChild(description);
        info.appendChild(bottom);

        card.appendChild(imageContainer);
        card.appendChild(info);

        return card;
    }


    function renderFeaturedProducts() {

        if (!featuredContainer) {
            return;
        }

        featuredContainer.innerHTML = "";

        featuredProducts.forEach((product) => {

            featuredContainer.appendChild(
                createProductCard(product)
            );

        });
    }


    renderFeaturedProducts();


    /* =====================================================
       RE-RENDER PRODUCTS WHEN LANGUAGE CHANGES
       ===================================================== */

    if (languageToggle) {

        languageToggle.addEventListener("click", () => {

            setTimeout(() => {
                renderFeaturedProducts();
            }, 10);

        });

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       BUSINESS LINKS
       =====================================================

       Replace these # links with the client's
       actual WhatsApp, Instagram and Google Maps URLs.
    */

    const instagramLink =
        document.getElementById("instagramLink");

    const whatsappLink =
        document.getElementById("whatsappLink");

    const mapsLink =
        document.getElementById("mapsLink");


    if (instagramLink) {

        instagramLink.href = "#";

        instagramLink.target = "_blank";

    }


    if (whatsappLink) {

        whatsappLink.href = "#";

        whatsappLink.target = "_blank";

    }


    if (mapsLink) {

        mapsLink.href = "#";

        mapsLink.target = "_blank";

    }


    /* =====================================================
       SIMPLE SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".category-card, .product-card, .section-heading"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "reveal"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (!mobileNav || !mobileMenuButton) {
            return;
        }

        const clickedInsideNav =
            mobileNav.contains(event.target);

        const clickedButton =
            mobileMenuButton.contains(event.target);


        if (
            mobileNav.classList.contains("active") &&
            !clickedInsideNav &&
            !clickedButton
        ) {

            mobileNav.classList.remove("active");

            mobileMenuButton.textContent = "☰";

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

});
```
