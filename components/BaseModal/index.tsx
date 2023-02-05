import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useModalStore } from "../../store/useModalStore";

const BaseModal: React.FC = () => {
  const { showModal, setOpen } = useModalStore();

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      centered
      title
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer
      className="text-center"
    >
      <h2 className="text-xl font-bold text-center">Register Sucessfully!</h2>

      <p className="text-base text-center">
        Thank you for your registration, you will be redirect to the Login page
        soon.
      </p>
    </Modal>
  );
};

export default BaseModal;
