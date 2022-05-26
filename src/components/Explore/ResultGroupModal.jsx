import React from 'react';
import Modal from './Modal';
import ResultGroup from './ResultGroup';

function ResultGroupModal({
  groupName, items, onClose,
}) {
  return (
    <Modal onClose={onClose}>
      <ResultGroup
        groupName={groupName}
        items={items}
      />
    </Modal>
  );
}

export default ResultGroupModal;
