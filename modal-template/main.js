
function toggleModal(){
  const old_modal = document.getElementsByTagName('modal-template')[0];
  if (old_modal) {
    document.body.removeChild(old_modal)
    return
  };

  const modal = document.createElement('modal-template');

  document.body.appendChild(modal);
}
