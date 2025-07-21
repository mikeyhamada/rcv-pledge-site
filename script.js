const GAS_BASE_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

document.addEventListener("DOMContentLoaded", () => {
  const editForm = document.getElementById("editForm");
  const deleteForm = document.getElementById("deleteForm");

  if (editForm) {
    editForm.addEventListener("submit", async e => {
      e.preventDefault();
      const uuid = document.getElementById("uuid").value;
      const monthly = document.getElementById("monthly").value;
      const upfront = document.getElementById("upfront").value;
      const end2025 = document.getElementById("end2025").value;

      const res = await fetch(GAS_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updatePledge",
          uuid,
          data: {
            "Amount to Give Monthly (Pledge)": monthly,
            "Extra Amount to Give Up Front (ASAP)": upfront,
            "Extra Amount to Give Before End of 2025": end2025
          }
        })
      });
      const text = await res.text();
      document.getElementById("result").textContent = text;
    });
  }

  if (deleteForm) {
    deleteForm.addEventListener("submit", async e => {
      e.preventDefault();
      const uuid = document.getElementById("delete_uuid").value;
      const res = await fetch(GAS_BASE_URL + '?action=deleteRequest&uuid=' + encodeURIComponent(uuid));
      const text = await res.text();
      document.getElementById("deleteResult").textContent = text;
    });
  }
});
