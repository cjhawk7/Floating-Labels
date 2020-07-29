// moving labels below input on the form to implement floating labels
var $ = window.jQuery
var mainForm = $('#webform-client-form-2')
if ($(mainForm).is(':visible')) {
  $("input[type='text']").attr('placeholder', '')
  if (mainForm[0]) {
    if (mainForm[0].clientHeight != 0) {
      $("input[type='text']").css('padding', '1.5em 1em .5em 1.5em')
      var formLabels = $('.webform-component-textfield')
      for (var i in formLabels) {
        if (formLabels[i].children) {
          var formLabel = formLabels[i].children[0]
          if (formLabels[i].children[1]) {
            var formInput = formLabels[i].children[1]
            $(formLabel)
              .removeClass('element-invisible')
              .addClass('form-control-placeholder')
              .insertAfter(formInput)
            $(formInput).addClass('form-control')
          }
        }
      }
    }
  }
}
var message
// adding message for required fields if button is disabled
if ($(mainForm).is(':visible')) {
  if ($('.button-primary').attr('disabled', true))
    message = $(
      '<p class="req-fields">Please fill out all required fields.</p>',
    )
  $(message).insertAfter('.webform-component--about-me')
}
// adding classes to append error message to
$(mainForm[0][6].parentElement).addClass('input-email')
$(mainForm[0][7].parentElement).addClass('input-phone')
$(mainForm[0][8].parentElement).addClass('input-zip')
// border error styling
var addBorder = {
  border: '2px solid red',
  '-webkit-border-radius': '2px',
  '-moz-border-radius': '2px',
  'border-radius': '2px',
  '-webkit-box-shadow': '0px 0px 10px red',
  '-moz-box-shadow': '0px 0px 10px red',
  'box-shadow': '0px 0px 10px red',
}
var removeBorder = {
  border: 'none',
  '-webkit-border-radius': 'none',
  '-moz-border-radius': 'none',
  'border-radius': '0px',
  '-webkit-box-shadow': 'none',
  '-moz-box-shadow': 'none',
  'box-shadow': '0px',
}
var errAlert = $('<p class="alert-err"></p>')
var phoneReg = /^[0-9]{10,11}$/
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
var zipReg = /^[0-9]{5,5}$/
var emailVal
var phoneVal
var zipVal
// validating email phone and zip fields
function validateFields() {
  $('#edit-submitted-about-me-email').on('input', function () {
    emailVal = mainForm[0][6].value
    if (emailVal != '') {
      if (emailReg.test(emailVal)) {
        errAlert[0].innerHTML = ''
        $(mainForm[0][6]).css(removeBorder)
      } else {
        errAlert[0].innerHTML = 'Please enter a valid e-mail'
        $(errAlert).appendTo($('.input-email'))
        $(mainForm[0][6]).css(addBorder)
      }
    } else {
      errAlert[0].innerHTML = ''
      $(mainForm[0][6]).css(removeBorder)
    }
    enableSubmit(emailVal, phoneVal, zipVal)
  })
  $('#edit-submitted-about-me-phone').on('input', function () {
    // removing special characters on phone number
    phoneVal = mainForm[0][7].value.replace(/[^A-Z0-9]+/gi, '')
    if (phoneVal != '') {
      if (phoneReg.test(phoneVal)) {
        errAlert[0].innerHTML = ''
        $(mainForm[0][7]).css(removeBorder)
      } else {
        errAlert[0].innerHTML = 'Please enter a valid phone number'
        $(errAlert).appendTo($('.input-phone'))
        $(mainForm[0][7]).css(addBorder)
      }
    } else {
      errAlert[0].innerHTML = ''
      $(mainForm[0][7]).css(removeBorder)
    }
    enableSubmit(emailVal, phoneVal, zipVal)
  })
  $('#edit-submitted-about-me-zipcode').on('input', function () {
    zipVal = mainForm[0][8].value
    if (zipVal != '') {
      if (zipReg.test(zipVal)) {
        errAlert[0].innerHTML = ''
        $(mainForm[0][8]).css(removeBorder)
      } else {
        errAlert[0].innerHTML = 'Please enter a valid zip-code'
        $(errAlert).appendTo($('.input-zip'))
        $(mainForm[0][8]).css(addBorder)
      }
    } else {
      errAlert[0].innerHTML = ''
      $(mainForm[0][8]).css(removeBorder)
    }
    enableSubmit(emailVal, phoneVal, zipVal)
  })
}
validateFields()
// enabling form submit if all tests pass
function enableSubmit(emailVal, phoneVal, zipVal) {
  if (emailVal == '' || phoneVal == '' || zipVal == '') {
    $('.button-primary').attr('disabled', true)
    $(message).show()
    return
  } else {
    emailReg.test(emailVal) && phoneReg.test(phoneVal) && zipReg.test(zipVal)
      ? $('.button-primary').attr('disabled', false) &
        (errAlert[0].innerHTML = '') &
        $(message).hide()
      : $('.button-primary').attr('disabled', true)
  }
}
// disabling submit button on form submit
$(mainForm).submit(function () {
  $("input[type='submit']", this)
    .val('Please Wait...')
    .attr('disabled', 'disabled')
  return true
})
