function showErrorModal(errorMessage) {
  const errorModalElem = $('#modal-error');
  // Adding an event listener every time the error modal is shows is not 100% efficient
  // If a user doesn't cause a lot of errors, he gets rewarded with better page performance <.<
  errorModalElem.on('show.bs.modal', () => {
    errorModalElem.find('.modal-error-message').text(`Something went wrong. ${errorMessage}`);
  });

  errorModalElem.modal('show');
}

$(document).ready(() => {
  console.log('Initializing app');
  showErrorModal('Testing');
});
