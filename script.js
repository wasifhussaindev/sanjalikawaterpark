// ===================================
// Document Ready
// ===================================
$(document).ready(function() {
    'use strict';

    // ===================================
    // Preloader
    // ===================================
    $(window).on('load', function() {
        setTimeout(function() {
            $('#preloader').addClass('hidden');
        }, 1500);
    });

    // ===================================
    // Initialize AOS (Animate On Scroll)
    // ===================================
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }

        // Show/Hide Scroll to Top Button
        if ($(this).scrollTop() > 300) {
            $('.scroll-top-btn').addClass('visible');
        } else {
            $('.scroll-top-btn').removeClass('visible');
        }
    });

    // ===================================
    // Smooth Scrolling for Navigation Links
    // ===================================
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'swing');
            
            // Close mobile menu after clicking
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ===================================
    // Active Navigation Link on Scroll
    // ===================================
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop() + 100;
        
        $('.navbar-nav .nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            
            if (refElement.length && 
                refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav .nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // ===================================
    // Scroll to Top Button
    // ===================================
    $('.scroll-top-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });

    // ===================================
    // Gallery Lightbox
    // ===================================
    $('.gallery-item').on('click', function() {
        var imgSrc = $(this).data('img');
        $('#modalImage').attr('src', imgSrc);
    });

    // ===================================
    // Form Validation - Quick Booking
    // ===================================
    $('#quickBookingForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#bookName').val().trim();
        var email = $('#bookEmail').val().trim();
        var phone = $('#bookPhone').val().trim();
        var date = $('#bookDate').val();
        var adults = $('#bookAdults').val();
        var children = $('#bookChildren').val();
        
        // Validation
        var isValid = true;
        var errorMessage = '';
        
        // Name validation
        var namePattern = /^[A-Za-z]{3,}$/
        if (!namePattern.test(name)) {
            isValid = false;
            errorMessage += 'Please enter a valid name.\n';
        }
        
        // Email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        // Phone validation
        var phonePattern = /^[\d\s\-\+\(\)]+$/;
        if (!phonePattern.test(phone) || phone.length < 10) {
            isValid = false;
            errorMessage += 'Please enter a valid phone number.\n';
        }
        
        // Date validation
        if (date === '') {
            isValid = false;
            errorMessage += 'Please select a visit date.\n';
        } else {
            var selectedDate = new Date(date);
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                errorMessage += 'Please select a future date.\n';
            }
        }
        
        // Number validation
        if (parseInt(adults) < 0 || parseInt(children) < 0) {
            isValid = false;
            errorMessage += 'Please enter valid numbers for adults and children.\n';
        }
        
        if (parseInt(adults) === 0 && parseInt(children) === 0) {
            isValid = false;
            errorMessage += 'Please select at least one ticket.\n';
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage('Booking submitted successfully! We will contact you shortly.');
            
            // Reset form
            this.reset();
            
            // Add animation effect
            $(this).closest('.booking-form-container').addClass('fade-in');
        } else {
            showErrorMessage(errorMessage);
        }
    });

    // ===================================
    // Form Validation - Modal Booking
    // ===================================
    $('#modalBookingForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#modalName').val().trim();
        var email = $('#modalEmail').val().trim();
        var phone = $('#modalPhone').val().trim();
        var date = $('#modalDate').val();
        var adults = parseInt($('#modalAdults').val()) || 0;
        var children = parseInt($('#modalChildren').val()) || 0;
        var seniors = parseInt($('#modalSeniors').val()) || 0;
        
        // Validation
        var isValid = true;
        var errorMessage = '';
        
       // Name validation
       var namePattern = /^[A-Za-z]{3,}$/
       if (!namePattern.test(name)) {
           isValid = false;
           errorMessage += 'Please enter a valid name.\n';
       }
        
        // Email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        // Phone validation
        var phonePattern = /^[\d\s\-\+\(\)]+$/;
        if (!phonePattern.test(phone) || phone.length < 10) {
            isValid = false;
            errorMessage += 'Please enter a valid phone number.\n';
        }
        
        // Date validation
        if (date === '') {
            isValid = false;
            errorMessage += 'Please select a visit date.\n';
        } else {
            var selectedDate = new Date(date);
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                errorMessage += 'Please select a future date.\n';
            }
        }
        
        // Number validation
        if (adults === 0 && children === 0 && seniors === 0) {
            isValid = false;
            errorMessage += 'Please select at least one ticket.\n';
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage('Booking confirmed! Check your email for confirmation details.');
            
            // Close modal
            $('#bookingModal').modal('hide');
            
            // Reset form
            this.reset();
            updateBookingSummary();
        } else {
            showErrorMessage(errorMessage);
        }
    });

    // ===================================
    // Calculate Booking Total
    // ===================================
    function updateBookingSummary() {
        var adults = parseInt($('#modalAdults').val()) || 0;
        var children = parseInt($('#modalChildren').val()) || 0;
        var seniors = parseInt($('#modalSeniors').val()) || 0;
        
        // Pricing
        var adultPrice = 45;
        var childPrice = 30;
        var seniorPrice = 35;
        
        var total = (adults * adultPrice) + (children * childPrice) + (seniors * seniorPrice);
        
        // Apply group discount if 10 or more tickets
        var totalTickets = adults + children + seniors;
        if (totalTickets >= 10) {
            total = total * 0.8; // 20% discount
            $('#totalAmount').html('$' + total.toFixed(2) + ' <small class="text-success">(20% Group Discount Applied)</small>');
        } else {
            $('#totalAmount').text('$' + total.toFixed(2));
        }
    }
    
    // Update summary when ticket numbers change
    $('#modalAdults, #modalChildren, #modalSeniors').on('change input', updateBookingSummary);

    // ===================================
    // Contact Form Validation
    // ===================================
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#contactName').val().trim();
        var email = $('#contactEmail').val().trim();
        var phone = $('#contactPhone').val().trim();
        var message = $('#contactMessage').val().trim();
        
        // Validation
        var isValid = true;
        var errorMessage = '';
        
        // Name validation
        var namePattern = /^[A-Za-z]{3,}$/
        if (!namePattern.test(name)) {
            isValid = false;
            errorMessage += 'Please enter a valid name.\n';
        }
        
        // Email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        // Phone validation
        var phonePattern = /^[\d\s\-\+\(\)]+$/;
        if (!phonePattern.test(phone) || phone.length < 10) {
            isValid = false;
            errorMessage += 'Please enter a valid phone number.\n';
        }
        
        // Message validation
        if (message === '' || message.length < 10) {
            isValid = false;
            errorMessage += 'Please enter a message (minimum 10 characters).\n';
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage('Message sent successfully! We will get back to you soon.');
            
            // Reset form
            this.reset();
            
            // Add animation effect
            $(this).closest('.contact-form-container').addClass('fade-in');
        } else {
            showErrorMessage(errorMessage);
        }
    });

    // ===================================
    // Success Message Function
    // ===================================
    function showSuccessMessage(message) {
        // Create success alert
        var alertHtml = `
            <div class="alert alert-success alert-dismissible fade show custom-alert" role="alert">
                <i class="fas fa-check-circle me-2"></i>
                <strong>Success!</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Append to body
        $('body').append(alertHtml);
        
        // Position fixed
        $('.custom-alert').css({
            'position': 'fixed',
            'top': '100px',
            'right': '20px',
            'z-index': '9999',
            'min-width': '300px',
            'animation': 'slideInRight 0.5s ease-out'
        });
        
        // Auto dismiss after 5 seconds
        setTimeout(function() {
            $('.custom-alert').fadeOut(500, function() {
                $(this).remove();
            });
        }, 5000);
    }

    // ===================================
    // Error Message Function
    // ===================================
    function showErrorMessage(message) {
        // Create error alert
        var alertHtml = `
            <div class="alert alert-danger alert-dismissible fade show custom-alert" role="alert">
                <i class="fas fa-exclamation-circle me-2"></i>
                <strong>Error!</strong><br>${message.replace(/\n/g, '<br>')}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Append to body
        $('body').append(alertHtml);
        
        // Position fixed
        $('.custom-alert').css({
            'position': 'fixed',
            'top': '100px',
            'right': '20px',
            'z-index': '9999',
            'min-width': '300px',
            'animation': 'slideInRight 0.5s ease-out'
        });
        
        // Auto dismiss after 7 seconds
        setTimeout(function() {
            $('.custom-alert').fadeOut(500, function() {
                $(this).remove();
            });
        }, 7000);
    }

    // ===================================
    // Set Minimum Date for Booking
    // ===================================
    function setMinimumDate() {
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        var year = tomorrow.getFullYear();
        var month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        var day = String(tomorrow.getDate()).padStart(2, '0');
        
        var minDate = year + '-' + month + '-' + day;
        
        $('#bookDate, #modalDate').attr('min', minDate);
    }
    
    setMinimumDate();

    // ===================================
    // Counter Animation
    // ===================================
    function animateCounter(element, target, duration) {
        var start = 0;
        var increment = target / (duration / 16);
        
        var timer = setInterval(function() {
            start += increment;
            if (start >= target) {
                clearInterval(timer);
                start = target;
            }
            $(element).text(Math.floor(start));
        }, 16);
    }

    // ===================================
    // Ride Card Hover Effect Enhancement
    // ===================================
    $('.ride-card').hover(
        function() {
            $(this).find('.ride-image img').css('transform', 'scale(1.15) rotate(2deg)');
        },
        function() {
            $(this).find('.ride-image img').css('transform', 'scale(1) rotate(0deg)');
        }
    );

    // ===================================
    // Food Card Animation
    // ===================================
    $('.food-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        $('.hero-section').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });

    // ===================================
    // Dynamic Year in Footer
    // ===================================
    var currentYear = new Date().getFullYear();
    $('.footer-bottom p').html('&copy; ' + currentYear + ' Sanjalika Water Park. All Rights Reserved. | Designed with <i class="fas fa-heart"></i> for Adventure');

    // ===================================
    // Lazy Loading Images
    // ===================================
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // Add Ripple Effect to Buttons
    // ===================================
    $('.btn').on('click', function(e) {
        var ripple = $('<span class="ripple"></span>');
        var btnOffset = $(this).offset();
        var xPos = e.pageX - btnOffset.left;
        var yPos = e.pageY - btnOffset.top;
        
        ripple.css({
            top: yPos,
            left: xPos
        });
        
        $(this).append(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 1000);
    });

    // ===================================
    // Navbar Mobile Menu Enhancement
    // ===================================
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Close navbar when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').collapse('hide');
            $('.navbar-toggler').removeClass('active');
        }
    });

    // ===================================
    // Gallery Image Preloading
    // ===================================
    $('.gallery-item').each(function() {
        var imgSrc = $(this).data('img');
        var img = new Image();
        img.src = imgSrc;
    });

    // ===================================
    // Smooth Scroll to Section with Offset
    // ===================================
    function scrollToSection(sectionId) {
        var offset = 80;
        var targetSection = $(sectionId);
        
        if (targetSection.length) {
            $('html, body').animate({
                scrollTop: targetSection.offset().top - offset
            }, 1000, 'swing');
        }
    }

    // ===================================
    // Add Loading State to Forms
    // ===================================
    $('form').on('submit', function() {
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.html();
        
        submitBtn.prop('disabled', true);
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Processing...');
        
        setTimeout(function() {
            submitBtn.prop('disabled', false);
            submitBtn.html(originalText);
        }, 2000);
    });

    // ===================================
    // Input Focus Effect
    // ===================================
    $('.form-control').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });

    // ===================================
    // Easter Egg - Konami Code
    // ===================================
    var konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    var konamiIndex = 0;
    
    $(document).on('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        $('body').addClass('rainbow-mode');
        showSuccessMessage('🎉 Rainbow Mode Activated! Enjoy the colors!');
        
        setTimeout(function() {
            $('body').removeClass('rainbow-mode');
        }, 10000);
    }

    // ===================================
    // Add Print Functionality
    // ===================================
    function printBookingDetails() {
        window.print();
    }

    // ===================================
    // Accessibility Improvements
    // ===================================
    // Add ARIA labels dynamically
    $('.nav-link').attr('role', 'button');
    $('.btn').attr('role', 'button');
    
    // Keyboard navigation for gallery
    $('.gallery-item').attr('tabindex', '0').on('keypress', function(e) {
        if (e.which === 13 || e.which === 32) {
            $(this).click();
        }
    });

    // ===================================
    // Performance Optimization
    // ===================================
    // Debounce scroll event
    var scrollTimeout;
    $(window).on('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Scroll-dependent functions here
        }, 100);
    });

    // ===================================
    // Initialize Tooltips
    // ===================================
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🌊 Welcome to Sanjalika Water Park! 🌊', 'color: #00bfff; font-size: 24px; font-weight: bold;');
    console.log('%cDive into adventure with us!', 'color: #667eea; font-size: 16px;');

}); // End Document Ready

// ===================================
// Additional Animations CSS (to add to style.css)
// ===================================
/*
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 1s ease-out;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.rainbow-mode * {
    animation: rainbow 3s linear infinite !important;
}

@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

.focused {
    position: relative;
}

.focused::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary-color);
    animation: slideInBottom 0.3s ease-out;
}

@keyframes slideInBottom {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}
*/
