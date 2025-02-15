const submitForm = document.querySelector("#submit-form");
const emailInput = document.querySelector("#email");
const fileInput = document.querySelector("#files");
const submitButton = document.querySelector("#submit-button");

submitForm.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    submitButton.disabled = true;
    const formData = new FormData();
    formData.append("email", emailInput.value);
    for (const file of fileInput.files) {
      formData.append("files", file);
    }
    const res = await fetch("/send-email", { method: "POST", body: formData });
    const data = await res.json();
    alert("Your email has been sent successfully!");
    submitForm.reset();
  } catch (error) {
    alert("Something went wrong: " + error);
  } finally {
    submitButton.disabled = false;
  }
});
