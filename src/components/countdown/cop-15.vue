<template>
    <section class="countdown">
        <div class="alignment">
            <a :href="url">
                <img width="30" height="30" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAotQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////XZkxLgAAANl0Uk5TADgIGbi3GzUdjKoBau6FUPdCExBEUkO2+B9KCwN949D1mVl5mxJnxufN9MqjN9rS3H/86u++nazHwl/66dbo5aJ4yc6AIQIv2+KLFo06kI9mw1QHud3z5tTgc2/e+aiB0QlMgzz7tEVgYXHk8MGv8vZHKyWJNOvLSLDAdjsssZilcv+haKdwQZE9FV3E/cVrn8jXPnwm1SoGe1EubjnsHGJAqe2zBZMpdVOWiE3+zJo/2ZwtT5eKuw1WFCAP0zEKBG1G33copoIkDheOpPF0erwnZKtOsgxshJQ3i6kAAAJSSURBVHicY2BAAYxMDHgAMwsrGx5pdg5OLm6csjy8fPwCgkI4ZIVFRMXEJSSlpGWwyUrLisvJKygqKauoYkpyq6lraGpp6+jq6RswYsoaahsZm5iasZtbWGpbYUgbWtvY2tk7ODIYOjnburi6ocq6e3gq2NgJeHn7+Prp+wcEBqHIBoeEhoVHREZFx8TGubkxxyc4JCK7PskgQj2SNzlFwyRVLiQtPYNLLTMLSTowW0AiJzcjL7/A2VQru9C9qLgkBCFbmh3uUVZewVQZVlVdYyJgWpsYXeeHML3e1iC7Qa2xrqypuUWvtbGtnYG9Q6cTJtuVK5em0q3cY2NTZtLb18XUP8Fn4iRE0Ez2mpI8lTtjmp6tXL7J1OmySjMYmGbOYoZJz5g9J1xlrlpoqLVEqm37vHigUO38Bd5w7QvtooW1U+csily8xCyjlXGp9IxFGsuWwwNFfYWpV0G2p+ZKxlWrF2bULihZk2e01gOWbmryFflW6ojYrxNZLyvYvWFl3EbeJiAogkqvXNuzaXPplpytK32nltRN2LY9tQlZulCiKWz6OjXRHXw7g2fVBvo0NfHGeFY57IJKz/ds8ksy7tu9K2OPmhPrKo+mvfv27zhwcAfMbROaDh5KOHzkaD/jseMn9MoWnASKnToCT7LM9qe7toaHyp/ZE71ep6nprCnXuVNTpBBx0q6pGyTSki6lNLckDuysJuvzyOlB0tfwwszoCTOmXEy6dBnoLe0rS1HSCwN3iVZT3lXWkISW7SI7rmFmFbeiZVzXbxieXyWGpBEAWQ69sts1dpQAAAAASUVORK5CYII=" />
            </a>
        </div>
        <div>
            <a :href="url">
                <span v-if="time.days > 1">{{ time.days }} DAYS<br />TO COP 15</span>
                <span v-else-if="time.days == 1">{{ time.days }} DAY<br />&nbsp;TO COP 15</span>
                <span v-else>COP 15</span>
            </a>
        </div>
    </section>
</template>
  
<script>
export default {
    name: 'CopCountDown',
    props: {
        endDate: Date,
        url: String,
    },
    data() {
        return {
            currentDate: new Date()
        }
    },
    computed : {
        time : getNumberDays
    },
    mounted() {
        this.timer = setInterval(()=>{
            this.currentDate = new Date();
        }, 1000*60)
    },
    unmounted() {
        clearInterval(this.timer);
    }
}

function getNumberDays()
{
    const countDownDate = this.endDate.getTime();
    const now           = this.currentDate.getTime();
    const distance      = countDownDate - now;
    const days          = Math.ceil(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
    const hours         = Math.ceil((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
    const minutes       = Math.ceil((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
    const seconds       = Math.ceil((distance % (1000 * 60)) / 1000).toString().padStart(2, "0");

    return { days, hours, minutes, seconds };
}
</script>
  
<style scoped>
a {
    color: inherit;
    text-decoration: none;
}

.countdown {
    background-color: #13a89e;
    text-align: center;
    display: flex;
    font-family: Arial Black, Arial, Helvetica, sans-serif;
    font-style: bold;
    font-size: 12px;
    color: #ffffff;
    padding: 7px 12px;
}

.alignment {
  margin: auto;
}
</style>