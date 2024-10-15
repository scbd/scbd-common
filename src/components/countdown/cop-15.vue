<template>
    <section class="countdown">
        <div class="alignment">
            <a :href="url">
                <img width="35" height="35" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFGUlEQVRYhb2Xe6zXcxjHX10sd11NUbQubpUSNaWWWZI/slhKsYq5TorxF3MZudcWQ0JWUoshjdXacq+k5VKylaiU45QkRTldvPzxPGfn5/Q7ndt4tu8+3+/383yf5/157t8GKvWkzsBOYFt9BTWsrwDgYWAr0L++ghrXHwt3APuAj4DWQGmdJal1vdqqm9Tn8rlUfa8e8urspobAS0C7gnd/AO2By4Eu/6dlWqhd1I5qZ3WWQQ/lfh/1GPWE2shtUIds6gHcB3RMC/wFNAH2EEE8OC12CXApsPa/sEw7dZq6O63wjfqz+kk+t1NvzPsfch1VG8vUNJs6AdOBC4HdwCbgbGAlMA9YQWTUs8BC4HfgOKA38FpNDVMTMM2B1cCvqfw4oBERsF8B3YB7gGYp72igDXAA6FdTIECN3PRRmrw01zXqRnVPpnb/5GuoDlD3qmXqr+ogdYo6oiZuqo7h9gSwXV2rblU357sS9RS1awIzv+mrjjSybYy6Lfdurg+Yk9Rf1HXq6gzK5ep+K4rb5FS0N9e7Ksm4TN2Q34xRm6hH1gXM3amkVH0jQW1U9+Xpz00AO1LZwXwut1I/tYP6qfqg2kZdqs6rLZhm6Y6SFH4ggaxVf0z3TLGCdqhvqu+of+e7gSlrkBXu+y2tWysw41PgOvULo7aUGXWmUfLMTZ4SdbZRcYcVAFyrtk/es9S30tIvVwWmqtTuDewAWgEC64F1RD1pC1wPXJy864BbgRFEv/qAqEVHAd2BDUBJvj+QpaAPsLSy0mLtoC+wCPiBKPFtEsSDwANEiT+SaAMHU9k+4FyiHnVLOVcmbwnQALgKmA88TtSsQ6iYZc6kYuhaCMxMK+0HWuR9KVFlOwAn5rUC6JXfXQwMBVYRE2AZ8CNwLfA00cvKDtFcxHdjM/qPVadmwLXIvekF8fB3xsv6fPdo8nxuFMNTi8gerT5hFeldzDKv5LogzTyTmFNuIia5TcCutFTr5N0D/AyMB84HRiVfOV0GDAMeA47P7zZUVlzVcPVaAukJjAauBiYSbhkI/AlsJ3z/FjCXiKNS4AWih0E0WAgXjQIWAxcAXYspLQamBzCSCMhngNnARUSwNgaWAS2BAbnuB7bk/tvAlwn0NuB94LyUtQQ4OQ/2OpEo1YK5AVhDpO9m4M48SUfgVSKItwDHAFOIX5WFwKdE8B8ghq4OyfMkMCPBl1MTYHhlxcVipiUxq3yZVjkHOCL3ymfbdsAgIiPGEPHyYV4/5akXABMqgTis7mKW2ZNrL2AOkcJjgOeBWYQLzgK+JmJjFTG3PACcloBnEa6oivYD71aLDvgu187AcuAzIsPOACYTVbkpFSeHcF0ZEcw9gPsL5H0PjANOIaryfGAs4c5qwXxYcF9+ula5TgKGEC2iJ/AF4ftpRFt4MvfOy0OtBm7h0F/fpkRG/ouKuWlJXoX75TWhN/AiEZiDiYDtBOwFTidOfhsxej5FtITKQAYmmGWHaK6ig56TVfWNfO5lTHuFtNr4L2qtLlLvVXdV4vleXaAuNkbSplmdi46hhxuuhmfJvyg/PjoFjlM7GXPKwwVtYroxH1dHE6vSWd0MPFS9Qp1gzDPd831zY6REvU6dlPcD1Dnqx8lfSHvVKw+nrzow5VNf4bxbTlPVa9RvjaluvfpU8i5WHzH+HG7I/UZFZNcaTOF1vv92xU5jxt1tdPDF+X69MZrWSn5d/rUhOvMQogC2J4rdDKIFrCSmulrTP9oJh1H6YLaAAAAAAElFTkSuQmCC" />
            </a>
        </div>
        <div class="alignment">
            <a :href="url">
                <span v-if="time.days >= 1">
                    <span v-for="char in time.days"><span class="countdown-box">{{ char }}</span>&nbsp;</span>DAY<span v-if="time.days > 1">S</span><br />TO COP 15
                </span>
                <span v-else>COP 15</span>
            </a>
        </div>
    </section>
</template>
  
<script lang="ts">
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
    width: 120px;
    text-align: center;
    display: flex;
    font-family: Arial Black, Arial, Helvetica, sans-serif;
    font-style: bold;
    font-size: 12px;
    color: #ffffff;
    padding-top: 1px;
    padding-left: 0px;
    padding-right: 5px;
    padding-bottom: 0px;
}
.alignment {
    padding: 1px;
    display: block;
    margin: auto;
}

.countdown-box {
    border: solid #ffffff 1px;
    padding: 0.5px;
}
</style>