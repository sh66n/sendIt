const submitForm = document.querySelector("#submit-form");
const emailInput = document.querySelector("#email");
const fileInput = document.querySelector("#files");

submitForm.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", emailInput.value);
    for (const file of fileInput.files) {
      formData.append("files", file);
    }
    const res = await fetch("/send-email", { method: "POST", body: formData });
    const data = await res.json();
    alert("Your email has been sent successfully!");
  } catch (error) {
    alert("Something went wrong: ", error);
  }
});
