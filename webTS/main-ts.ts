
// Core nFrame dependencies.
import { nEngine, IAnimation } from './_source/_nEngine';

// Imports.
import { GlobalComponent } from './_source/global-component';


class MainComponent extends nEngine {
    constructor() {
        super()
    }

    
    // Call all Normal TS/JS classes using render().
    render() {

       // Declare functional classes here.
        new GlobalComponent();

    }

    // Page action hooks.
    // Returned Object must match syntax below. 
    // Duration indicates the length of the animation played.
    // Action is the called animation action, the duration callback must match the duration property.

    // Fire when link is clicked, for triggering loading animations.
    onNavigate(): IAnimation {
        return {
            duration: 500,
            action: () => {
                (<HTMLElement>document.querySelector('.lds-roller')).style.display = "block";
                $('.lds-roller').animate({
                    opacity: '1'
                }, 500);
            }
        }
    };

    // Fire when request is complete, for removing loading animations.
    onNavigateComplete(): IAnimation {
        return {
            duration: 500,
            action: () => {
                const localSet = () => {
                    (<HTMLElement>document.querySelector('.lds-roller')).style.display = "none";
                }
                $('.lds-roller').animate({
                    opacity: '0'
                }, 500, function() {
                    localSet();
                });
            }
        }
    }

    // Fire when onNavigateComplete is done, used for triggering transitions between views.
    // Populates page content with new data from AJAX.
    onPageLoad(): IAnimation {
        return {
            duration: 500,
            action: () => {
                $('.page-transition').animate({
                    opacity: '1',
                    width: '100%',
                    marginLeft: '0%'
                }, 500, 'swing')
            }
        }
    }

    // Fire when onPageLoad() has finished, used for completing transitions.
    onPageLoadComplete(): IAnimation {
        return {
            duration: 500,
            action: () => {
                $('.page-transition').animate({
                    opacity: '1',
                    width: '0%',
                    marginLeft: '100%'
                }, 500, 'swing').promise().then(() => {
                    $('.page-transition').animate({
                        opacity: '1',
                        width: '0%',
                        marginLeft: '0%'
                    }, 500)
                })
            }
        }
    }

}


window.onload = () => {
    new MainComponent();
}
