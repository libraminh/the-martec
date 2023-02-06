import { Modal } from "antd";
import { ReactNode } from "react";
import { useModalStore } from "../store/useModalStore";

const BaseModal = ({ children }: { children: ReactNode }) => {
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
      {children}
    </Modal>
  );
};

export default BaseModal;
