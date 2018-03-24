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
        var visibleButtons = [];
        let settings = $.extend({
            showTabs: true,
            additionalButtons: [],
            nextButtonClass: '.btnNext',
            previousButtonClass: '.btnPrevious',
            finishButtonText: 'Finish',
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

        function hideAdditionalButtons() {
            let buttons = settings.additionalButtons;
            for (let index in buttons) {
                for (let btn in buttons[index].buttons) {
                    $(self).find(buttons[index].buttons[btn]).addClass('d-none');
                    $(self).find(buttons[index].buttons[btn]).removeClass('d-block');
                }
            }
        }

        function updateNextButtonState(e) {
            let btn = $(self).find(settings.nextButtonClass);
            let tab = $(e.target).attr('href');
            $(self).find('.tab-content').find($(e.target));
            if ($(self).find(tab).is(':last-child')) {
                btn.addClass('btnFinish').text(settings.finishButtonText);
            } else {
                $(btn).removeClass('btnFinish').text('Next');
            }
        }

        function updateAdditionalButtonsState(btn) {
            let tab = $(btn).attr('href');

            let visible = settings.additionalButtons.filter(function (group) {
                if (group.tab === tab) {
                    if (group.buttons) {
                        return group.buttons;
                    }
                }
            })[0];
            hideAdditionalButtons();
            if (visible) {
                let btns = visible.buttons.join(', ');
                console.log(btns);
                $(self).find(btns).removeClass('d-none');
                $(self).find(btns).addClass('d-block');
            }
        }

        if (!settings.showTabs) {
            $(self).find('.nav-tabs').hide();
        }
        hideAdditionalButtons();
        let activeTab = $(self).find('.nav-tabs a.active');
        console.log(activeTab);
        updateAdditionalButtonsState(activeTab);

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
            }
        });
        $(self).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            updateNextButtonState(e);
            updateAdditionalButtonsState(this);
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
        });
        return this;
    };
}(jQuery));