"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const storageKey = "utsavikaStudentProfile";
    const form = document.getElementById("student-profile-form");
    const status = document.getElementById("profile-save-message");

    if (!form) return;

    const savedProfile = (() => {
        try {
            return JSON.parse(localStorage.getItem(storageKey) || "null");
        } catch {
            return null;
        }
    })();

    if (savedProfile) {
        form.querySelectorAll("[name]").forEach((field) => {
            if (field.type === "checkbox") {
                field.checked = (savedProfile.interests || []).includes(field.value);
            } else if (field.type === "radio") {
                field.checked = savedProfile[field.name] === field.value;
            } else if (Object.prototype.hasOwnProperty.call(savedProfile, field.name)) {
                field.value = savedProfile[field.name];
            }
        });
        if (status) status.textContent = "Your saved profile was loaded from this browser.";
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const profile = {};

        for (const [name, value] of formData.entries()) {
            if (name !== "interests") profile[name] = String(value).trim();
        }
        profile.interests = formData.getAll("interests");

        try {
            localStorage.setItem(storageKey, JSON.stringify(profile));
            if (status) status.textContent = "Profile saved. Your dashboard will show these details.";
        } catch {
            if (status) status.textContent = "This browser could not save the profile. Please try again.";
        }
    });

    form.addEventListener("reset", () => {
        window.setTimeout(() => {
            try {
                localStorage.removeItem(storageKey);
                if (status) status.textContent = "Saved profile details were cleared from this browser.";
            } catch {
                if (status) status.textContent = "Could not clear the saved profile from this browser.";
            }
        }, 0);
    });
});
