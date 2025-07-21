const GAS_BASE_URL = 'https://script.google.com/macros/s/AKfycbyF4LBXNbtDHxgam2n6VuEfrdp_o7wDECVlqjLeeN2tTSLZPpbU4bUXltf-yHl8ilIO/exec';

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
  const editForm = document.getElementById("editForm");
  const deleteForm = document.getElementById("deleteForm");

  const uuid = getQueryParam("uuid");
  if (uuid && document.getElementById("uuid")) {
    document.getElementById("uuid").value = uuid;
  }
  if (uuid && document.getElementById("delete_uuid")) {
    document.getElementById("delete_uuid").value = uuid;
  }

  if (editForm) {
    editForm.addEventListener("submit", async e => {
      e.preventDefault();
      const uuid = document.getElementById("uuid").value.trim();
      const monthly = document.getElementById("monthly").value;
      const upfront = document.getElementById("upfront").value;
      const end2025 = document.getElementById("end2025").value;

      if (!uuid) {
        alert("Please enter your UUID.");
        return;
      }

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
      const uuid = document.getElementById("delete_uuid").value.trim();
      if (!uuid) {
        alert("Please enter your UUID.");
        return;
      }
      const res = await fetch(GAS_BASE_URL + '?action=deleteRequest&uuid=' + encodeURIComponent(uuid));
      const text = await res.text();
      document.getElementById("deleteResult").textContent = text;
    });
  }
});
