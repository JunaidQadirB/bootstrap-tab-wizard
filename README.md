bootstrap-tab-wizard
===

A jQuery plugin to enhance a Bootstrap Tab component to a wizard.

Install
---
`npm install bootstrap-tab-wizard`

Usage
---
include the `bootstrap-tab-wizard` script tag after `jquery` and `bootstrap` script tags.

````html
    <div class="container">
        <div id="myWizard">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                       aria-selected="true">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                       aria-controls="profile" aria-selected="false">Profile</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                       aria-controls="contact" aria-selected="false">Contact</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">Home</div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Profile</div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Contact</div>
            </div>
            <hr/>
            <div class="row">
                <button class="btn btnTab1 btn-primary mr-1 d-none">Tab1</button>
                <button class="btn btnTab2 btn-secondary mr-1 d-none">Tab2</button>
                <button class="btn btnPrev btn-primary mr-1 ml-auto">Previous</button>
                <button class="btn btnNext btn-primary">Next</button>
            </div>
        </div>
    </div>
    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="bootstrap-tab-wizard.min.js"></script>
````
**Then add the activation script like so**
````javascript
$('#myWizard').TabWizard({
        additionalButtons: [
            {
                tab: '#home',
                buttons: ['.btnTab1']
            },
            {
                tab: '#profile',
                buttons: ['.btnTab2', '.btnTab1']
            },
        ],
        nextButtonClass: '.btnNext',
        previousButtonClass: '.btnPrev',
        onFinish: function () {
            alert('Complete!');
        },
    });
````


