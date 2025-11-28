// src/pages/settings/SettingsPage.js
import React, { useContext, useState, useEffect } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function SettingsPage() {
  const { vendor, setVendor } = useContext(AuthContext);

  // Store status
  const [storeOpen, setStoreOpen] = useState(vendor?.is_open || false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  // Business info
  const [storeName, setStoreName] = useState(vendor?.store_name || "");
  const [storePhone, setStorePhone] = useState(vendor?.store_phone || "");
  const [storeAddress, setStoreAddress] = useState(vendor?.store_address || "");
  const [supportWhatsapp, setSupportWhatsapp] = useState(vendor?.support_whatsapp || "");

  // Bank
  const [bankName, setBankName] = useState(vendor?.bank_name || "");
  const [accountNumber, setAccountNumber] = useState(vendor?.account_number || "");
  const [accountHolder, setAccountHolder] = useState(vendor?.account_holder || "");

  // Files
  const [logoPreview, setLogoPreview] = useState(vendor?.logo_url || "");
  const [coverPreview, setCoverPreview] = useState(vendor?.cover_url || "");

  const [savingInfo, setSavingInfo] = useState(false);
  const [savingBank, setSavingBank] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  // ----------------------------
  // STORE OPEN/CLOSE
  // ----------------------------
  const toggleStore = async () => {
    const newStatus = !storeOpen;
    setStoreOpen(newStatus);
    setLoadingStatus(true);

    try {
      await api.put("/vendor/settings/store-status", { is_open: newStatus });

      const updatedVendor = { ...vendor, is_open: newStatus };
      setVendor(updatedVendor);
      localStorage.setItem("gauss_vendor", JSON.stringify(updatedVendor));

      alert(newStatus ? "Store is now OPEN" : "Store is now CLOSED");
    } catch {
      alert("Failed to update store status");
    } finally {
      setLoadingStatus(false);
    }
  };

  // ----------------------------
  // UPDATE BUSINESS INFO
  // ----------------------------
  const saveBusinessInfo = async () => {
    setSavingInfo(true);

    try {
      const body = {
        store_name: storeName,
        store_phone: storePhone,
        store_address: storeAddress,
        support_whatsapp: supportWhatsapp,
      };

      const res = await api.put("/vendor/settings/info", body);

      const updatedVendor = { ...vendor, ...body };
      setVendor(updatedVendor);
      localStorage.setItem("gauss_vendor", JSON.stringify(updatedVendor));

      alert("Business info updated!");
    } catch {
      alert("Failed to update info");
    } finally {
      setSavingInfo(false);
    }
  };

  // ----------------------------
  // UPDATE BANK INFO
  // ----------------------------
  const saveBank = async () => {
    setSavingBank(true);

    try {
      const body = {
        bank_name: bankName,
        account_number: accountNumber,
        account_holder: accountHolder,
      };

      await api.put("/vendor/settings/bank", body);

      const updatedVendor = { ...vendor, ...body };
      setVendor(updatedVendor);
      localStorage.setItem("gauss_vendor", JSON.stringify(updatedVendor));

      alert("Bank details saved!");
    } catch {
      alert("Failed to save bank details");
    } finally {
      setSavingBank(false);
    }
  };

  // ----------------------------
  // UPLOAD LOGO
  // ----------------------------
  const uploadLogo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingLogo(true);
    const form = new FormData();
    form.append("logo", file);

    try {
      const res = await api.put("/vendor/settings/logo", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const url = res.data.logo_url;
      setLogoPreview(url);

      const updatedVendor = { ...vendor, logo_url: url };
      setVendor(updatedVendor);
      localStorage.setItem("gauss_vendor", JSON.stringify(updatedVendor));
    } catch {
      alert("Logo upload failed");
    } finally {
      setUploadingLogo(false);
    }
  };

  // ----------------------------
  // UPLOAD COVER IMAGE
  // ----------------------------
  const uploadCover = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingCover(true);
    const form = new FormData();
    form.append("cover", file);

    try {
      const res = await api.put("/vendor/settings/cover", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const url = res.data.cover_url;
      setCoverPreview(url);

      const updatedVendor = { ...vendor, cover_url: url };
      setVendor(updatedVendor);
      localStorage.setItem("gauss_vendor", JSON.stringify(updatedVendor));
    } catch {
      alert("Cover upload failed");
    } finally {
      setUploadingCover(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">Settings</h2>

      {/* STORE STATUS */}
      <Card title="Store Availability">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              background: storeOpen ? "#1aa25122" : "#ff4d4f22",
              padding: "10px 16px",
              borderRadius: 10,
              width: "fit-content",
              color: storeOpen ? "#1aa251" : "#ff4d4f",
              fontWeight: 600,
            }}
          >
            {storeOpen ? "STORE IS OPEN" : "STORE IS CLOSED"}
          </div>

          <Button
            variant={storeOpen ? "danger" : "success"}
            onClick={toggleStore}
            disabled={loadingStatus}
            style={{ width: 200 }}
          >
            {loadingStatus
              ? "Updating..."
              : storeOpen
              ? "Close Store"
              : "Open Store"}
          </Button>
        </div>
      </Card>

      {/* LOGO & COVER */}
      <Card title="Brand Images">
        <div style={{ display: "flex", gap: 30 }}>
          {/* LOGO */}
          <div>
            <p>Store Logo</p>
            {logoPreview && (
              <img
                src={logoPreview}
                alt="logo"
                style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 10 }}
              />
            )}
            <input type="file" onChange={uploadLogo} />
          </div>

          {/* COVER IMAGE */}
          <div>
            <p>Cover Image</p>
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover"
                style={{ width: 200, height: 120, objectFit: "cover", borderRadius: 10 }}
              />
            )}
            <input type="file" onChange={uploadCover} />
          </div>
        </div>
      </Card>

      {/* BUSINESS INFO */}
      <Card title="Business Information">
        <div className="form">
          <input
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Business Phone"
            value={storePhone}
            onChange={(e) => setStorePhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Store Address"
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="Support WhatsApp"
            value={supportWhatsapp}
            onChange={(e) => setSupportWhatsapp(e.target.value)}
          />

          <Button onClick={saveBusinessInfo} disabled={savingInfo}>
            {savingInfo ? "Saving..." : "Save Info"}
          </Button>
        </div>
      </Card>

      {/* BANK DETAILS */}
      <Card title="Bank Details">
        <div className="form">
          <input
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />

          <input
            type="text"
            placeholder="Account Holder"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
          />

          <Button onClick={saveBank} disabled={savingBank}>
            {savingBank ? "Saving..." : "Save Bank Details"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
