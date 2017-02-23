/**
 * Contact Form
 */

    var debug = false; //show system errors
    var t = $(".js-form"),
        a = $;

    a(".validateIt").validate({
        rules: {
            "field[Name]": "required",
            "field[Email]": "required",
            "field[Subject]": 'required',
            "field[Message]": 'required'
        },
        messages: {
            "field[Name]": "Pole 'Imię' jest wymagane",
            "field[Email]": "Pole 'Email' jest wymagane",
            "field[Subject]": "Podaj temat wiadomości",
            "field[Message]" : "Pole 'Treść wiadomości' jest wymagane"
        },
        submitHandler: function() {
            var t = a(".validateIt"),
                s = "true" == t.attr("data-show-errors"),
                r = "true" == t.attr("data-hide-form"),
                i = t.attr("data-email-subject"),
                d = t.find('[type="submit"]');
            return d.hasClass("disabled") ? !1 : (a('[name="field[]"]', t).each(function(e, t) {
                var s = a(t),
                    r = s.attr("placeholder");
                if (r) {
                    var i = s.attr("required") ? "[required]" : "[optional]",
                        d = s.attr("type") ? s.attr("type") : "unknown";
                    i = i + "[" + d + "]";
                    var n = s.attr("name").replace("[]", "[" + r + "]");
                    n += i, s.attr("data-previous-name", s.attr("name")), s.attr("name", n)
                }
            }), t.append('<input class="temp" type="hidden" name="email_subject" value="' + i + '">'), t.append('<input type="hidden" name="js" value="1">'), a.ajax({
                url: t.attr("action"),
                method: "post",
                data: t.serialize(),
                dataType: "json",
                success: function(i) {
                    if (a("span.error", t).remove(), a(".error", t).removeClass("error"), a(".form-group", t).removeClass("has-error"), i.errors) a.each(i.errors, function(e, r) {
                        if ("global" == e) alert(r);
                        else {
                            var i = a('[name^="' + e + '"]', t).addClass("error");
                            s && i.after('<span class="error help-block">' + r + "</span>"), i.parent(".form-group") && i.parent(".form-group").addClass("has-error")
                        }
                    });
                    else {
                        var n = i.success ? ".successMessage" : ".errorMessage";
                        r ? (a(".ct-popupHeader").fadeOut(), t.fadeOut(function() {
                            t.parent().find(n).show()
                        })) : (t.parent().find(n).fadeIn(), t[0].reset())
                    }
                    d.removeClass("disabled"), e(t)
                },
                error: function(a) {
                    debug && alert(a.responseText), d.removeClass("disabled"), e(t)
                }
            }), !1)
        }
    })
