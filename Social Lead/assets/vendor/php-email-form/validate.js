/**
 * PHP Email Form Validation - v3.6
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  let form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let thisForm = this;

    let action =
      "https://script.google.com/macros/s/AKfycbyxocrt-2JVrbvmRzAYmcy-adIV1vTbC2GO0bJ7eb6iuJuPnZ9P3vVa3dtRWMCVPlqwYw/exec";
    // "https://script.google.com/macros/s/AKfycbwaT90kCGDUP258p-9YcmKbW_80f1iyYDuxgNA3gaI1IsIJVJ-puIDxiMptjCu2Ivdvog/exec";
    // "https://script.google.com/macros/s/AKfycbyIXCTz-89zeKOOWB2W9YR_kSSkgKIWVCcfY7e408Ct1YMN9GfM17bHZtoCVWhu4sQp/exec";

    let recaptcha = thisForm.getAttribute("data-recaptcha-site-key");

    if (!action) {
      displayError(thisForm, "The form action property is not set!");
      return;
    }
    thisForm.querySelector(".loading").classList.add("d-block");
    thisForm.querySelector(".error-message").classList.remove("d-block");
    thisForm.querySelector(".sent-message").classList.remove("d-block");
    document.getElementById("sendMessage").innerHTML = "Sending Message...";
    let formData = new FormData(thisForm);

    // if (recaptcha) {
    //   if (typeof grecaptcha !== "undefined") {
    //     grecaptcha.ready(function () {
    //       try {
    //         grecaptcha
    //           .execute(recaptcha, { action: "php_email_form_submit" })
    //           .then((token) => {
    //             formData.set("recaptcha-response", token);
    //             php_email_form_submit(thisForm, action, formData);
    //           });
    //       } catch (error) {
    //         displayError(thisForm, error);
    //       }
    //     });
    //   } else {
    //     displayError(
    //       thisForm,
    //       "The reCaptcha javascript API url is not loaded!"
    //     );
    //   }
    // } else {
    php_email_form_submit(thisForm, action, formData);
    // }
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          //     return response.text();
          //   } else {
          //     throw new Error(
          //       `${response.status} ${response.statusText} ${response.url}`
          //     );
          //   }
          // })
          // .then((data) => {
          thisForm.querySelector(".loading").classList.remove("d-block");
          // if (data.trim() == "OK") {
          thisForm.querySelector(".sent-message").classList.add("d-block");
          thisForm.reset();
          document.getElementById("sendMessage").innerHTML = "Send Message";
          setTimeout(function () {
            thisForm.querySelector(".sent-message").classList.remove("d-block");
          }, 5000);
        } else {
          throw new Error(
            data
              ? data
              : "Form submission failed and no error message returned from: " +
                action
          );
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
