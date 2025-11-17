/************ NOTIFIKASI ************/
function showNotif(
  title,
  message,
  type = "error",
  isSuccess = null,
  notifId = "notifBox"
) {
  const box = document.getElementById(notifId);
  if (!box) return;

  const titleEl = box.querySelector(".notif-title") || box.querySelector("h3");
  const msgEl = box.querySelector(".notif-message") || box.querySelector("p");
  const icon = box.querySelector(".notif-icon");

  box.classList.remove("success", "error", "warning");
  icon.className = "notif-icon";

  if (isSuccess !== null) {
    if (isSuccess) {
      box.classList.add("success");
      icon.classList.add("success");
      icon.innerHTML = "✔";
    } else {
      box.classList.add("error");
      icon.classList.add("error");
      icon.innerHTML = "!";
    }
  } else {
    box.classList.add(type);
    icon.classList.add(type);
    icon.innerHTML = type === "success" ? "✔" : type === "warning" ? "⚠" : "!";
  }

  titleEl.textContent = title;
  msgEl.textContent = message;

  const actions = box.querySelector(".notif-actions");
  if (actions) {
    actions.style.display = type === "warning" ? "flex" : "none";
  }

  box.classList.add("show");

  if (type !== "warning") {
    setTimeout(() => box.classList.remove("show"), 2500);
  }
}

function closeNotif(notifId = "notifBox") {
  const box = document.getElementById(notifId);
  if (!box) return;
  box.classList.remove("show");
  const actions = box.querySelector(".notif-actions");
  if (actions) actions.style.display = "none";
}

/************ SIDEBAR TOGGLE FOR MOBILE ************/
const sidebar = document.querySelector(".sidebar");
const menuBar = document.querySelector(".fas.fa-bars");
if (menuBar && sidebar) {
  menuBar.addEventListener("click", () => sidebar.classList.toggle("active"));
}

/************ PASSWORD TOGGLE ************/
const togglePass = document.getElementById("togglePassword");
if (togglePass) {
  togglePass.addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    if (!passwordField) return;
    passwordField.type =
      passwordField.type === "password" ? "text" : "password";
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
}

/************ LOGIN ************/
const loginBtn = document.querySelector('button[onclick="login()"]');
if (loginBtn) {
  function login() {
    const emailEl = document.getElementById("email");
    const passEl = document.getElementById("password");
    if (!emailEl || !passEl) return;

    const email = emailEl.value.trim();
    const pass = passEl.value.trim();

    if (!email && !pass) {
      showNotif("Login Gagal", "Email dan Password harus diisi!", null, false);
    } else if (!email) {
      showNotif("Login Gagal", "Harap isi email!", null, false);
    } else if (!pass) {
      showNotif("Login Gagal", "Harap isi password!", null, false);
    } else if (email === "maulidyaaulia64@gmail.com" && pass === "24090126") {
      showNotif("Login Berhasil", "Anda akan diarahkan...", null, true);
      setTimeout(() => (window.location.href = "dashboard.html"), 2000);
    } else {
      showNotif("Login Gagal", "Email atau Password salah!", null, false);
    }
  }

  // ENTER KEY
  ["email", "password"].forEach((id) => {
    const el = document.getElementById(id);
    if (el)
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") login();
      });
  });
}

/************ DASHBOARD SUMMARY ************/
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("totalProducts")) {
    const summary = {
      totalProducts: 120,
      totalSales: 85,
      totalRevenue: 12500000,
    };
    document.getElementById("totalProducts").textContent =
      summary.totalProducts;
    document.getElementById("totalSales").textContent = summary.totalSales;
    document.getElementById("totalRevenue").textContent =
      "Rp " + summary.totalRevenue.toLocaleString("id-ID");
  }

  /************ CHARTS ************/
  if (document.getElementById("salesTableChart")) {
    const salesData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Sales",
          data: [30, 50, 40, 45, 50, 45, 50, 50, 70, 60, 70, 85],
          fill: false,
          borderColor: "#393939",
          backgroundColor: "rgba(57,57,57,0.5)",
          tension: 0.1,
        },
      ],
    };
    new Chart(document.getElementById("salesTableChart").getContext("2d"), {
      type: "bar",
      data: salesData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  if (document.getElementById("revenueChart")) {
    const revenueData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue",
          data: [
            1000000, 6000000, 4000000, 7000000, 6500000, 9000000, 7000000,
            10000000, 9000000, 12000000, 12500000, 12500000,
          ],
          fill: true,
          borderColor: "#B0B0B0FF",
          backgroundColor: "rgba(123,123,123,0.4)",
          tension: 0.1,
        },
      ],
    };
    new Chart(document.getElementById("revenueChart").getContext("2d"), {
      type: "line",
      data: revenueData,
      options: { responsive: true, maintainAspectRatio: false },
    });
  }

  /************ PRODUCTS TABLE ************/
  const productTable = document.getElementById("productTable");
  if (!productTable) return;

  const products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 },
  ];
  let currentEditId = null;
  let productToDelete = null;

  function loadProducts() {
    productTable.innerHTML = "";
    products.forEach((p, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>Rp ${p.price.toLocaleString("id-ID")}</td>
        <td>${p.stock}</td>
        <td>
          <span class="edit" onclick="editProduct(${
            p.id
          })"><i class="fas fa-edit"></i></span>
          <span class="delete" onclick="showDeleteConfirm(${
            p.id
          })"><i class="fas fa-trash"></i></span>
        </td>
      `;
      productTable.appendChild(row);
    });
  }

  /************ MODAL CONTROL ************/
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = "flex";
    const content = modal.querySelector(".modal-content");
    content.style.animation = "none";
    void content.offsetWidth;
    content.style.animation = "dropIn 0.35s ease-out";
  }
  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = "none";
  }

  /************ EDIT & ADD ************/
  window.editProduct = function (id) {
    const p = products.find((x) => x.id === id);
    currentEditId = id;
    document.getElementById("editName").value = p.name;
    document.getElementById("editPrice").value = p.price;
    document.getElementById("editStock").value = p.stock;
    openModal("editModal");
  };

  window.saveEdit = function () {
    const name = document.getElementById("editName").value.trim();
    const price = Number(document.getElementById("editPrice").value);
    const stock = Number(document.getElementById("editStock").value);
    if (!name || !price || !stock)
      return showNotif("Gagal!", "Semua field wajib diisi!", "error");

    const p = products.find((x) => x.id === currentEditId);
    p.name = name;
    p.price = price;
    p.stock = stock;
    closeModal("editModal");
    loadProducts();
    showNotif("Sukses!", "Produk berhasil diperbarui!", "success");
  };

  const addBtn = document.querySelector(".add-product");
  if (addBtn)
    addBtn.addEventListener("click", () => {
      document.getElementById("addName").value = "";
      document.getElementById("addPrice").value = "";
      document.getElementById("addStock").value = "";
      openModal("addModal");
    });

  window.saveAdd = function () {
    const name = document.getElementById("addName").value.trim();
    const price = Number(document.getElementById("addPrice").value);
    const stock = Number(document.getElementById("addStock").value);
    if (!name || !price || !stock)
      return showNotif("Gagal!", "Semua field wajib diisi!", "error");

    products.push({ id: Date.now(), name, price, stock });
    closeModal("addModal");
    loadProducts();
    showNotif("Sukses!", "Produk berhasil ditambahkan!", "success");
  };

  /************ DELETE CONFIRM ************/
  window.showDeleteConfirm = function (id) {
    productToDelete = id;
    const notifBox = document.getElementById("notifBox");
    if (!notifBox) return;
    const notifTitle =
      notifBox.querySelector("#notifTitle") || notifBox.querySelector("h3");
    const notifMessage =
      notifBox.querySelector("#notifMessage") || notifBox.querySelector("p");
    const notifIcon = notifBox.querySelector(".notif-icon");

    notifBox.classList.remove("success", "error", "warning");
    notifBox.classList.add("warning");
    notifIcon.className = "notif-icon warning";
    notifIcon.textContent = "⚠";
    notifTitle.textContent = "Hapus Produk?";
    notifMessage.textContent = "Apakah Anda yakin ingin menghapus produk ini?";

    const actions = notifBox.querySelector(".notif-actions");
    if (actions) actions.style.display = "flex";

    notifBox.classList.add("show");
  };

  window.confirmDelete = function () {
    const idx = products.findIndex((x) => x.id === productToDelete);
    if (idx > -1) products.splice(idx, 1);
    loadProducts();
    closeNotif();
    showNotif("Berhasil!", "Produk berhasil dihapus!", "success");
  };

  window.closeNotif = closeNotif;

  /************ ENTER TO SAVE (MODAL) ************/
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    if (document.getElementById("editModal")?.style.display === "flex") {
      e.preventDefault();
      saveEdit();
    }
    if (document.getElementById("addModal")?.style.display === "flex") {
      e.preventDefault();
      saveAdd();
    }
  });

  loadProducts();
});
