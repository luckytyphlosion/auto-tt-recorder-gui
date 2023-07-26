import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

type GhostAuto = "main-ghost-auto" | "comparison-ghost-auto";
type IfExtends<T, U> = T extends U ? true : false;

type Property = { myProperty: boolean };

type GhostAutoWithProperty = { [K in GhostAuto]: K } & Property;

type GhostAuto2 = keyof GhostAutoWithProperty;

// Usage example
type Result1 = IfExtends<GhostAuto2, Property>; // true
type Result2 = IfExtends<GhostAuto, Property>; // false

let ghostAuto: GhostAuto2 = "main-ghost-auto";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export function Sandbox() {
  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (subtitle !== null) {
      subtitle.style.color = '#f00';
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}
