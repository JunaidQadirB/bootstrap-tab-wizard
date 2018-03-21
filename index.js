(function ($) {
    /**
     * @return {function|boolean}
     */
    $.fn.TabWizard = function (options) {
        if (typeof $.fn.tab !== 'function') {
            console.warn('TabWizard depends on Bootstrap 4 Tab plugin');
            return false;
        }
        let self = this;
        let settings = $.extend({
            showTabs: true,
            nextButtonClass: '.btnNext',
            previousButtonClass: '.btnPrevious',
            onNext: function (callback) {
                if (typeof  callback === 'function') {
                    callback();
                }
            },
            onPrevious: function (callback) {
                if (typeof  callback === 'function') {
                    callback();
                }
            },
            onFinish: function (callback) {
                if (typeof  callback === 'function') {
                    callback();
                }
            }
        }, options);
        if (!settings.showTabs) {
            $(self).find('.nav-tabs').hide();
        }
        if (!$(this).find(settings.nextButtonClass).length) {
            $(this).append(`<button class="btn btn-primary">Next</button>`);
        }
        if (!$(this).find(settings.previousButtonClass).length) {
            $(this).append(`<button class="btn btn-primary">Previous</button>`);
        }


        $(self).find(settings.nextButtonClass).click(function () {
            let btn = this;
            if ($(btn).hasClass('btnFinish')) {
                settings.onFinish();
            } else {
                $(self).find('.tab-content .tab-pane').each(function (pane) {

                    if ($(this).hasClass('active') && $(this).next('.tab-pane').length) {
                        let me = pane + 1;
                        $(self).find(`.nav-tabs`).find(`li:nth-child(${me + 1}) a`).tab('show');
                        return false;
                    }
                });
                checkIfFinish(self, settings);
            }
        });

        $(self).find(settings.previousButtonClass).click(function () {
            let btn = this;
            $(self).find('.tab-content .tab-pane').each(function (pane) {
                if ($(this).hasClass('active') && $(this).prev('.tab-pane').length) {
                    let me = pane + 1;
                    $(self).find(`.nav-tabs`).find(`li:nth-child(${me - 1}) a`).tab('show');
                    return false;
                }
            });

            checkIfFinish(self, settings);
        });
        return this;
    };

    function checkIfFinish(self, settings) {
        let btn = $(self).find(settings.nextButtonClass);
        if ($(self).find('.tab-content .active').is(':last-child')) {
            btn.addClass('btnFinish').text('Finish');
        } else {
            $(btn).removeClass('btnFinish').text('Next');
        }
    }
}(jQuery));