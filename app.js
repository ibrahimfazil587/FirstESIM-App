const API_BASE = "https://firstesim-api.onrender.com";

const plans = {
  "تورکیا": [
    ["10 GB","30 ڕۆژ","IQD 8,500"],
    ["20 GB","30 ڕۆژ","IQD 11,500"],
    ["50 GB","30 ڕۆژ","IQD 23,000"],
    ["Unlimited","3 ڕۆژ","IQD 8,000"],
    ["Unlimited","5 ڕۆژ","IQD 10,000"],
    ["Unlimited","7 ڕۆژ","IQD 11,500"],
    ["Unlimited","10 ڕۆژ","IQD 18,000"],
    ["Unlimited","15 ڕۆژ","IQD 23,000"],
    ["Unlimited","30 ڕۆژ","IQD 28,000"]
  ],

  "ئەڵمانیا":[
    ["1 GB","7 ڕۆژ","IQD 6,500"],
    ["5 GB","30 ڕۆژ","IQD 9,000"],
    ["10 GB","30 ڕۆژ","IQD 12,000"],
    ["20 GB","30 ڕۆژ","IQD 19,000"]
  ],

  "ئەمریکا":[
    ["3 GB","30 ڕۆژ","IQD 10,000"],
    ["10 GB","30 ڕۆژ","IQD 20,000"],
    ["20 GB","30 ڕۆژ","IQD 25,000"]
  ],

  "سعودیە":[
    ["20 GB","30 ڕۆژ","IQD 40,000"],
    ["25 GB","45 ڕۆژ","IQD 60,000"],
    ["50 GB","30 ڕۆژ","IQD 90,000"]
  ],

  "ئیمارات":[
    ["5 GB","30 ڕۆژ","IQD 20,000"],
    ["10 GB","30 ڕۆژ","IQD 25,000"],
    ["Unlimited","10 ڕۆژ","IQD 45,000"]
  ],

  "چین":[
    ["5 GB","30 ڕۆژ","IQD 11,500"],
    ["10 GB","30 ڕۆژ","IQD 20,000"],
    ["20 GB","30 ڕۆژ","IQD 25,000"]
  ],

  "ئیتالیا":[
    ["5 GB","30 ڕۆژ","IQD 12,000"],
    ["10 GB","30 ڕۆژ","IQD 16,000"],
    ["20 GB","30 ڕۆژ","IQD 23,000"]
  ],

  "سوئیسرا":[
    ["5 GB","30 ڕۆژ","IQD 16,000"],
    ["10 GB","30 ڕۆژ","IQD 23,000"],
    ["20 GB","30 ڕۆژ","IQD 31,000"]
  ]
};

const flags = {
  "تورکیا":"🇹🇷",
  "ئەڵمانیا":"🇩🇪",
  "ئەمریکا":"🇺🇸",
  "سعودیە":"🇸🇦",
  "ئیمارات":"🇦🇪",
  "چین":"🇨🇳",
  "ئیتالیا":"🇮🇹",
  "سوئیسرا":"🇨🇭"
};

const paymentNumbers = {
  "FIB":"7506021212",
  "FastPay":"7506021212",
  "Super Qi":"7111649351",
  "QuickPay":"7508107121"
};

let lang = 0;
let selectedCountry = "";
let selectedPlan = null;
let selectedPlanIndex = -1;
let selectedPay = "";
let order = null;

function app(content, active = "home") {
  document.getElementById("app").innerHTML =
    `<div class="page">${content}</div>${bottomNav(active)}`;

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

function bottomNav(active) {
  return `
    <nav class="bottom-nav">

      <button
        class="${active==="home"?"active":""}"
        onclick="showHome()"
      >
        <div>⌂</div>
        <span>سەرەکی</span>
      </button>

      <button
        class="${active==="countries"?"active":""}"
        onclick="showCountries()"
      >
        <div>◎</div>
        <span>وڵاتەکان</span>
      </button>

      <button
        class="${active==="orders"?"active":""}"
        onclick="showOrders()"
      >
        <div>▣</div>
        <span>سەفارشەکان</span>
      </button>

      <button
        class="${active==="profile"?"active":""}"
        onclick="showProfile()"
      >
        <div>♙</div>
        <span>پرۆفایل</span>
      </button>

    </nav>
  `;
}

function showHome() {

  const popular = [
    "تورکیا",
    "ئەڵمانیا",
    "ئەمریکا",
    "ئیمارات"
  ];

  app(`

    <section class="hero hero-home">

      <div class="hero-badge">
        🌍 FirstESIM
      </div>

      <h1>
        گەشتی بێ سنوور
      </h1>

      <p>
        eSIM ـی خێرا، ئاسان و باوەڕپێکراو بۆ هەموو جیهان
      </p>

      <input
        class="search hero-search"
        placeholder="🔎 گەڕان بە ناوی وڵات..."
        oninput="filterCountries(this.value)"
      >

    </section>


    <div class="feature-row">

      <div class="feature">
        <b>⚡</b>
        <strong>خێرا</strong>
        <span>چالاککردنی ئاسان</span>
      </div>

      <div class="feature">
        <b>🌐</b>
        <strong>${Object.keys(plans).length}+ وڵات</strong>
        <span>پۆششی جیهانی</span>
      </div>

      <div class="feature">
        <b>✓</b>
        <strong>باوەڕپێکراو</strong>
        <span>پشتیوانی</span>
      </div>

    </div>


    <div class="section-title">

      <h3>
        وڵاتە بەناوبانگەکان
      </h3>

      <button
        class="link-btn"
        onclick="showCountries()"
      >
        هەموو وڵاتەکان ←
      </button>

    </div>


    <div
      id="countryGrid"
      class="grid"
    >
      ${countryCards("", popular)}
    </div>

  `, "home");
}


function countryCards(filter="", only=null) {

  let list =
    only ||
    Object.keys(plans);

  return list

    .filter(c =>
      plans[c] &&
      (
        c.includes(filter) ||
        filter === ""
      )
    )

    .map(c => `

      <div
        class="card country-card"
        onclick='showCountry(${JSON.stringify(c)})'
      >

        <div class="flag">
          ${flags[c] || "🌍"}
        </div>

        <b>
          ${c}
        </b>

        <div class="small">
          ${plans[c].length} پلان
        </div>

        <div class="country-arrow">
          ›
        </div>

      </div>

    `)

    .join("");
}


function filterCountries(v) {

  document.getElementById(
    "countryGrid"
  ).innerHTML =
    countryCards(v.trim());

}


function showCountries() {

  app(`

    <div class="page-head">

      <button
        class="back"
        onclick="showHome()"
      >
        ←
      </button>

      <h2>
        وڵاتەکان
      </h2>

      <span></span>

    </div>


    <input
      class="search top-search"
      placeholder="🔎 گەڕان..."
      oninput="filterCountriesPage(this.value)"
    >


    <div
      id="countryGrid"
      class="country-list"
    >
      ${countryCards()}
    </div>

  `, "countries");

}


function filterCountriesPage(v) {

  document.getElementById(
    "countryGrid"
  ).innerHTML =
    countryCards(v.trim());

}


function showCountry(c) {

  selectedCountry = c;

  app(`

    <div class="page-head">

      <button
        class="back"
        onclick="showCountries()"
      >
        ←
      </button>

      <h2>
        ${c}
      </h2>

      <button class="icon-btn">
        ♡
      </button>

    </div>


    <div class="country-hero">

      <div class="country-hero-flag">
        ${flags[c] || "🌍"}
      </div>

      <div>

        <h1>
          ${c}
        </h1>

        <p>
          پلانەکانی eSIM
        </p>

      </div>

    </div>


    <div class="filter-pills">

      <span class="pill active">
        هەموو پلانەکان
      </span>

      <span class="pill">
        بێ سنوور
      </span>

      <span class="pill">
        داتا
      </span>

    </div>


    <div class="plans-list">

      ${plans[c].map((p,i) => `

        <div
          class="plan ${p[0]==="Unlimited"?"unlimited":""}"
        >

          <div class="plan-main">

            ${
              p[0]==="Unlimited"
              ?
              '<span class="plan-tag">بێ سنوور</span>'
              :
              ''
            }

            <div class="plan-data">
              ${p[0]}
            </div>

            <div class="small">
              ماوە: ${p[1]}
            </div>

          </div>


          <div class="plan-side">

            <div class="price">
              ${p[2]}
            </div>

            <button
              class="buy"
              onclick="planDetails(${i})"
            >
              کڕین
            </button>

          </div>

        </div>

      `).join("")}

    </div>

  `, "countries");
}


function planDetails(i) {

  selectedPlanIndex = i;

  selectedPlan =
    plans[selectedCountry][i];

  app(`

    <div class="page-head">

      <button
        class="back"
        onclick="showCountry(${JSON.stringify(selectedCountry)})"
      >
        ←
      </button>

      <h2>
        زانیاری پلان
      </h2>

      <span></span>

    </div>


    <div class="detail-card">

      <div class="detail-top">

        <div class="country-hero-flag small-flag">
          ${flags[selectedCountry] || "🌍"}
        </div>

        <div>

          <h2>
            ${selectedCountry}
          </h2>

          <div class="small">
            ${
              selectedCountry === "تورکیا"
              ? "Turkiye"
              : ""
            }
          </div>

        </div>

      </div>


      <div class="detail-price">
        ${selectedPlan[2]}
      </div>


      <div class="detail-title">
        ${selectedPlan[0]}
      </div>


      <div class="detail-meta">

        <div>
          🌐
          <b>${selectedPlan[0]}</b>
          <span>داتا</span>
        </div>

        <div>
          ▣
          <b>${selectedPlan[1]}</b>
          <span>ماوە</span>
        </div>

        <div>
          📶
          <b>4G/5G</b>
          <span>پەیوەندی</span>
        </div>

      </div>


      <div class="benefits">

        <p>
          ✓ خێرایی ئینتەرنێتی بەرز
        </p>

        <p>
          ✓ پەیوەندی ڕاستەوخۆ و باوەڕپێکراو
        </p>

        <p>
          ✓ ئاسان بۆ گەشتکردن
        </p>

        <p>
          ✓ بەکارهێنانی بێ سنوور لە چوارچێوەی پلان
        </p>

      </div>


      <button
        class="primary"
        onclick="checkout(${i})"
      >
        بەردەوام بە بۆ سەفارش
      </button>

    </div>

  `, "countries");
}


function checkout(i) {

  selectedPlanIndex = i;

  selectedPlan =
    plans[selectedCountry][i];

  selectedPay = "";

  app(`

    <div class="page-head">

      <button
        class="back"
        onclick="planDetails(${i})"
      >
        ←
      </button>

      <h2>
        شێوازی پارەدان
      </h2>

      <span></span>

    </div>


    <div class="summary-card">

      <b>
        ${flags[selectedCountry] || "🌍"}
        ${selectedCountry}
      </b>

      <p>
        ${selectedPlan[0]} —
        ${selectedPlan[1]}
      </p>

      <strong>
        ${selectedPlan[2]}
      </strong>

    </div>


    <div class="note payment-note">
      💡 تکایە شێوازی پارەدان هەڵبژێرە
    </div>


    ${pay(
      "🏦",
      "FIB",
      "بانکی فیدرالی عێراق"
    )}


    ${pay(
      "⚡",
      "FastPay",
      "فاست پەی"
    )}


    ${pay(
      "Q",
      "Super Qi",
      "سوپەر کیوای"
    )}


    ${pay(
      "↗",
      "QuickPay",
      "کویک پەی"
    )}


    <div class="payment-help">

      زانیاری پارەدان

      <br>

      <span>
        دوای پارەدان، تکایە سکرینی شۆت بنێرە.
      </span>

    </div>


    <button
      class="primary"
      onclick="paymentStep()"
    >
      بەردەوام بۆ دڵنیابوون
    </button>

  `, "home");
}


function pay(icon,name,sub) {

  const number =
    paymentNumbers[name];

  return `

    <div
      class="pay ${selectedPay===name?"active":""}"
      onclick='selectPayment(${JSON.stringify(name)})'
    >

      <div class="pay-icon">
        ${icon}
      </div>


      <div class="pay-info">

        <b>
          ${name}
        </b>

        <div class="small">
          ${sub}
        </div>

        <div class="pay-number">
          ${number}
        </div>

      </div>


      <div
        class="radio ${selectedPay===name?"checked":""}"
      >
        ${selectedPay===name?"✓":""}
      </div>

    </div>

  `;
}


function selectPayment(name) {

  selectedPay = name;

  renderPaymentSelection();

}


function renderPaymentSelection() {

  const root =
    document.getElementById("app");

  if (!root) return;


  root
    .querySelectorAll(".pay")
    .forEach(el =>
      el.classList.remove("active")
    );


  root
    .querySelectorAll(".radio")
    .forEach(el => {

      el.classList.remove("checked");

      el.textContent = "";

    });


  const pays =
    [...root.querySelectorAll(".pay")];


  const index =
    [
      "FIB",
      "FastPay",
      "Super Qi",
      "QuickPay"
    ].indexOf(selectedPay);


  if (
    index >= 0 &&
    pays[index]
  ) {

    pays[index]
      .classList.add("active");


    const radio =
      pays[index]
        .querySelector(".radio");


    if (radio) {

      radio.classList.add("checked");

      radio.textContent = "✓";

    }

  }

}


function paymentStep() {

  if (!selectedPay) {

    alert(
      "تکایە شێوازی پارەدان هەڵبژێرە"
    );

    return;

  }


  app(`

    <div class="page-head">

      <button
        class="back"
        onclick="checkout(${selectedPlanIndex})"
      >
        ←
      </button>

      <h2>
        پارەدان بە ${selectedPay}
      </h2>

      <span></span>

    </div>


    <div class="payment-number-card">

      <div class="small">
        ژمارەی ${selectedPay}
      </div>

      <strong>
        ${paymentNumbers[selectedPay]}
      </strong>

      <button
        onclick="copyPaymentNumber()"
      >
        📋 کۆپی ژمارە
      </button>

    </div>


    <div class="note">

      تکایە پارەکە بۆ ئەم ژمارەیە بنێرە،
      پاشان ناوی کڕیار و ژمارەی مۆبایل
      پڕبکەرەوە و پسوڵەکە باربکە.

    </div>


    <div class="card form-card">

      <input
        id="customerName"
        class="search"
        placeholder="ناوی کڕیار"
        autocomplete="name"
      >


      <input
        id="customerPhone"
        class="search"
        style="margin-top:10px"
        placeholder="ژمارەی مۆبایل"
        autocomplete="tel"
      >

    </div>


    <div class="upload">

      <div class="upload-icon">
        ▧
      </div>

      <b>
        سکرینی شۆت باربکە
      </b>

      <p class="small">
        PNG / JPG / PDF
      </p>

      <input
        id="receipt"
        type="file"
        accept="image/*,.pdf"
      >

    </div>


    <button
      id="orderBtn"
      class="primary"
      onclick="createOrder()"
    >
      ناردنی سکرینی شۆت
    </button>

  `, "home");

}


function copyPaymentNumber() {

  const number =
    paymentNumbers[selectedPay];

  navigator.clipboard?.writeText(number);

  alert(
    "ژمارەکە کۆپی کرا"
  );

}


async function createOrder() {

  const customerName =
    document
      .getElementById("customerName")
      ?.value.trim();


  const customerPhone =
    document
      .getElementById("customerPhone")
      ?.value.trim();


  const receipt =
    document
      .getElementById("receipt")
      ?.files?.[0];


  if (!customerName) {

    alert(
      "تکایە ناوی کڕیار بنووسە"
    );

    return;

  }


  if (!customerPhone) {

    alert(
      "تکایە ژمارەی مۆبایل بنووسە"
    );

    return;

  }


  if (!selectedPay) {

    alert(
      "تکایە شێوازی پارەدان هەڵبژێرە"
    );

    return;

  }


  const btn =
    document.getElementById(
      "orderBtn"
    );


  if (btn) {

    btn.disabled = true;

    btn.textContent =
      "لە ناردندا...";

  }


  const data =
    new FormData();


  data.append(
    "customerName",
    customerName
  );


  data.append(
    "customerPhone",
    customerPhone
  );


  data.append(
    "country",
    selectedCountry
  );


  data.append(
    "plan",
    `${selectedPlan[0]} — ${selectedPlan[1]}`
  );


  data.append(
    "price",
    selectedPlan[2]
  );


  data.append(
    "payment",
    selectedPay
  );


  if (receipt) {

    data.append(
      "receipt",
      receipt
    );

  }


  try {

    const r =
      await fetch(
        `${API_BASE}/api/orders`,
        {
          method:"POST",
          body:data
        }
      );


    const d =
      await r.json();


    if (!r.ok) {

      throw new Error(
        d.error ||
        "Order failed"
      );

    }


    order =
      d.order;


    localStorage.setItem(
      "firstesim_order",
      JSON.stringify(order)
    );


    showOrder();


  } catch(e) {

    console.error(e);

    alert(
      "نەتوانرا Order بنێردرێت. تکایە دووبارە هەوڵبدە."
    );


    if (btn) {

      btn.disabled = false;

      btn.textContent =
        "ناردنی سکرینی شۆت";

    }

  }

}


async function refreshOrder() {

  if (!order?.id) return;


  try {

    const r =
      await fetch(
        `${API_BASE}/api/orders/${encodeURIComponent(order.id)}`
      );


    const d =
      await r.json();


    if (!r.ok) {

      throw new Error(
        d.error ||
        "Order not found"
      );

    }


    order =
      d.order;


    localStorage.setItem(
      "firstesim_order",
      JSON.stringify(order)
    );


    showOrder();


  } catch(e) {

    alert(
      "نەتوانرا دۆخی Order نوێ بکرێتەوە."
    );

  }

}


function statusText(status) {

  const map = {

    waiting_payment_check:
      "چاوەڕوانی پشتڕاستکردنەوەی پارەدان",

    payment_confirmed:
      "پارەدان پشتڕاست کرا",

    esim_ready:
      "eSIM ئامادەیە",

    completed:
      "تەواو کرا",

    cancelled:
      "هەڵوەشێنرایەوە"

  };


  return (
    map[status] ||
    status ||
    "نادیار"
  );

}


function qrUrl(order) {

  if (!order?.qrUrl)
    return "";


  return order.qrUrl.startsWith("http")
    ? order.qrUrl
    : `${API_BASE}${order.qrUrl}`;

}


function showOrder() {

  if (!order) {

    order =
      JSON.parse(
        localStorage.getItem(
          "firstesim_order"
        ) || "null"
      );

  }


  if (!order) {

    showOrders();

    return;

  }


  const ready =
    order.status === "esim_ready" &&
    order.qrUrl;


  app(`

    <div class="page-head">

      <button
        class="back"
        onclick="showOrders()"
      >
        ←
      </button>

      <h2>
        سەفارشەکە
      </h2>

      <span></span>

    </div>


    <div class="order-card">

      <div class="order-id">
        ${order.id}
      </div>

      <div class="order-country">
        ${flags[order.country] || "🌍"}
        ${order.country}
      </div>

      <p>
        ${order.plan}
      </p>

      <strong>
        ${order.price}
      </strong>

      <p>
        پارەدان:
        ${order.payment}
      </p>

    </div>


    ${
      ready
      ?
      `

        <div class="qr">

          <div class="success-icon">
            ✓
          </div>

          <h3>
            eSIM ئامادەیە
          </h3>

          <p class="small">
            QR Code ـی ئامادەی بەکارهێنانە
          </p>

          <img
            src="${qrUrl(order)}"
            alt="eSIM QR Code"
            class="real-qr"
          >

          <div class="activation">

            <b>
              Activation Code
            </b>

            <br>

            ${order.activationCode || "—"}

          </div>

        </div>

      `
      :
      `

        <div class="status waiting">

          ● ${statusText(order.status)}

        </div>


        <div class="note">

          کاتێک تیمی FirstESIM
          پارەکە پشتڕاست بکات و QR Code
          دابنێت، لێرەدا دەردەکەوێت.

        </div>

      `
    }


    <button
      class="primary"
      onclick="refreshOrder()"
    >
      🔄 نوێکردنەوەی دۆخ
    </button>

  `, "orders");

}


function showOrders() {

  order =
    JSON.parse(
      localStorage.getItem(
        "firstesim_order"
      ) || "null"
    );


  app(`

    <div class="page-head">

      <span></span>

      <h2>
        سەفارشەکان
      </h2>

      <span></span>

    </div>


    ${
      order
      ?
      `

        <div
          class="order-card clickable"
          onclick="showOrder()"
        >

          <div class="order-id">
            ${order.id}
          </div>

          <p>

            ${flags[order.country] || "🌍"}

            ${order.country}

            —

            ${order.plan}

          </p>

          <div class="small">
            ${statusText(order.status)}
          </div>

        </div>

      `
      :
      `

        <div class="card empty">

          هێشتا هیچ سەفارشەیەکت نییە.

        </div>

      `
    }

  `, "orders");

}


function showProfile() {

  app(`

    <div class="page-head">

      <span></span>

      <h2>
        پرۆفایل
      </h2>

      <span></span>

    </div>


    <div class="profile-card">

      <div class="avatar">
        👤
      </div>

      <div>

        <h3>
          FirstESIM
        </h3>

        <p>
          خزمەتگوزاری eSIM
        </p>

      </div>

      <span>
        ›
      </span>

    </div>


    <div class="profile-menu">

      <div>
        🌐
        <b>زمان / Language</b>
        <span>Kurdish ›</span>
      </div>

      <div onclick="showOrders()">
        ▣
        <b>سەفارشەکان</b>
        <span>›</span>
      </div>

      <div>
        💬
        <b>پشتیوانی WhatsApp</b>
        <span>›</span>
      </div>

      <div>
        ❔
        <b>پرسیارە باوەکان (FAQ)</b>
        <span>›</span>
      </div>

      <div>
        ℹ️
        <b>دەربارەمان</b>
        <span>›</span>
      </div>

    </div>


    <div class="language-switch">

      <button class="selected">
        کوردی
      </button>

      <button>
        English
      </button>

      <button>
        العربية
      </button>

    </div>

  `, "profile");

}


function cycleLanguage() {

  alert(
    "لە وەشانی دواتردا کوردی، English و العربية بە تەواوی زیاد دەکرێن."
  );

}


showHome();
