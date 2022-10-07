<template>
    <section class="countdown">
        <div class="alignment">
            <a :href="url">
                <img width="30" height="30" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAADPBJREFUaN7VWguQFNUVXY3/iOx0v57FxRg1JPEfExKJxhiNn2iMxpiKiRpLgrHy0zIqKpqoRK1EiwItSsVlp/t19+5Md7+emd3ls4C/1biKIIiiIH+UCKyoiHyCoDI55/XMumgwcZflM1Vd09vTn3vfvfecc29vValU6l/VW5+2tr2qdsAHPtT26gPSof0NM3AGVe3uHxHZN4iCN8OMPbs2lxO7pROHKLW/GcrR2LJw5CNTySdr6+oO2A0dGbV/Zd8I5bXWRFUyIue63SulQud3ouDPR3082SdXJ6qlrDYj+a4ZOvP6ZrOpXd+DUmkPI3RuF+PDkmgJSkirf1sqM6Bq+PA94cQbZuSsFZG8yorci/sq//Bd1o+agnMEVv5WK/bOtYr+KdXZzJerRo/e11TO1Wbe/xDOvNfH80ycc6FQzg926aAYrY0HwehBhnKvhOF3i1CGIu+XRLGxhIg8y3P6OaMtK5TX1GSdIwxln8RI7hrWg/is0DvXVG6TpdylWPH1oiUHw+UWOPMEjr+rnQmdn5BXRFPjfUix84WSCo4+VaXUF3Z+BALnZBHaI2HYehj+Dgx/Heg0C1GBI+5CHH8TkZjD2jEa6w/BOSvg2Osmj8fe66ijV0xvTP+d6cMeMHI4DH9FG0dHQvsFXdShM5sRMIPM5awLOFLkBfj+Nf5ejvPyIMtJ2G+Gw2uEci/YOS4gFWD4GBjwPIxaZxYbgFD2PBhGiF2PlNmASC2uDuRhjJCVlV9NhZljEYn1IvZeQDoFZmAXcU2TyHuL8H3NTvEDDx6tIRYGIe9nIkXe1alFRyI5TTRlS2bOuYnphJqwE1J0zwa7r8H5oRHaAc7FIjht2Mbh2GKCxI6tCbA0irVcyHKTKDQQjYr4ezJWex2MfQ6r/ZoZyJtxbAbhtsIxTCUQ5Yv4XggHH2EKmgV/KZ3rm30olVL+oTvKie/CuLeRIm8nBKdr40MROe9zw7HXEK0PkHILsD89Hbpfqaqr2xsRGsjUgjN7CuVdDxDYhAjOwrXzzNgvHKQyhq6XSM4xcoDj3vwc1ib3wyo+q+EUjK1XM0IqBQ6dehXbSqTaS6IZaaXcKaKh7mAR2N+GUxlwyBYYv9rMySNRX/to9o/9e1Ohfyyu+4Oh5DmIyou43+M4n4BxdW9G43oYuoRwyXTCAzfigVz5Dhz/J1a4Ayu6TMTuUMKpobxr9TmRXK4BoJm84vz1k/e1lOyn5X4knxTQZjj3OZx3S6+QJIWfXnHlIhJ2B9JoBJxZTKaGY6vx2xwz75VIconTTogobMb57aiZeXBmAwABv7vtRiSHiMg7HbVyKdLo4rIzJ5ixOwX3eRn3mIBI1lKPMaJ4xpnUattJzcobccMGU3nzYRA0ky2RKnP16oXORqTFAhiwhA+ugRiEA4sAwQs0t8ABnFNKCFKn4fua5WO/A/tTyUcAhsGIxlAQa0YrZ+gwbgCCd/5bFLv1IZrAoDdMSo/A7sA3DfsI+E91+55GL+XGODajpuin8X0/DAXD2xsSJ+RqXTuRfBHfy2EYwaBkxe5iGF1fSS+cN4zNmF64QJ4mdB0BBUPZRme3Q7sqr9IQi6IWyeovx+othsHLsK9IanBmHFVvwt7yVhiwShscyTVWJKdbAAkg2GXp2DmZ/AFHnoYjq1BPs6rR1/O6lKrrW3HEzGZOxH0eSJ4hg+3D4Alxvawbo8B+FuF/S+git9dgxZnXM7ZOQ+iu2ENKSNbICuT6A3Dm1n5595h05PwIcLuZqYYaIbqxBX6MEdCrjudh/1JEe6IgaZJjInfoYVLutz14g8LusXJKUcl+gJV8h9HAA0civy+HHPkSivUMM5bXIApP6RpAFJEyj6RD+ceDQ/8o7A8DhywEKGzRWiv2WnGPF4Syv477/qXr5EUU/esYNTjTju82KIE/9yytAmcUHvqYESAKASA0An+AEFGo90HhjmDjBCen6KInaoFDEqaX3DZr0lTyfqRHI65dZU1A3x7YuS7Ru9FqargW8Hv6gNbWfS314IFESCzEVbjvRbh2cCpnn9IjxufwACs2S7M1jDICeRuQaAILFCJxDkjsLOx/S2iCdB7FtobESNmObSUMoePTyR9sqrT+UnIKwaNr6hp5bwgiHODe4CLyiD3Xmhjr840gM6S6SVb3OK1otGbaSE5FSlF+S/42AO2rPof9RegQhqfinKWamQPnaaTQXFz7Fo5/mNRDAzlmYo3vf7GzLUZ3COPbUCuM1vlc9VpEg7IGxy+F8wAU2xctdh9cl+5BWtWfhl57PAr8ASDKoXBoIEONbVjXSQi4YyxSYT6MmQnjV2nmJ2cQIEIHWsot6aiAJzTURplTzabGuygoyRnben4/tAD4vZU1pAcYPZqIEGXC+qOMRudorPJTnIww5Fbe+2YFSVDoI1C465NIuCs6CTB0NmtZD5BARDZSITMilDnWlCLb3uz/mhnjfucB9u9i9CrQ3P0UgxNMKzFRlbC6s81c5sLa8XUHwKB2RKEdjP0y0w/70yz034KKmM4Q5ehEUadVwGGDEbk/Z6OlI6a8E7cxE/ub1ZTN4/shOoDzHzpQOVbXtPzcH0upAym3NRpF8s6aESP0zVKhfW4iOSDh8Z1m3w5JAb54xFLuEj18iP111GLQXQ/D0YX9C42oJ3sYUvECph3v3fmg4cP36tK0DcO1C9m44X4uFqOIlvmMHk32qUqJIOz22K6ioWqDcVewLsq8slo7RHZPmqYNILB66q2aAjiILB7KXwGNnsB1N3G/rBbGVlKTZInznulf9Mx05H4vUcPuKEQV0t9Jopr314ogc163nGD6ID+Xonhf1XzBiUehgRD7UzzgTV0vkdMCXpggJkSMzlpqrnTeO76Cavh9HrahQMBfGJF9sVGoP6Svqj+cw22mCmdaqDeCAlBu7NfgREY/J1mkzk3PxNCodSsqZt4ZpJuk0H6QzAvueNtofPjofshXINdrWLWITRLRCCj0AR+ElZvJaFBTYdUfBuKtSCl5nJHLnENYRZr91si5x+ixaSC/r2dbTVlC9DLNRZQsH4PFx5smWGcDF+HzOwLpkQzZ0F+jxxa5zPlkWxIUBV4Xds5A0kOlOlmg0xa9usptBZLNAHz/MLmXMwjXPkghSO4BT9xIgGAapZlyHKcW/E870NURjYL1R3WDR+zfazZOOGE5U6MswQcmsJsZkm7J1VAkEk4p1/WwrtBwcJ9ieeCghu8jYnka0O4WXDcJ18eILJSC6xmx+xsYOBvH3ywbum0n9LjJWSpsu8/ndyTnXFLOTW5bdN6iL9FIBuSBweuI8UZu7DGiOciiaH+cIF1mAHTX80wh/bJHef2RhjdQ1VI3Wa1xSZNiKL+DNNq8VT3oGXGD5qrKhuNrExUs7+ze7IrpoNwtnQXXlEBw+bfH8cD5ZG7Kiq0AAhAMR9ZyMp80ZtmUVfCvNAC/nJaAWJ/GfacahPW837nq2uhAjkHv8ks4fp0ZeTfjPlcQLVFrf4Lj3Rvi6ZczHG8mkeC2yVDO0UQbk0M5joQo8cuMrdONhazc2zlh1DIDwEDGh0HLkF4bcA3gW96s0wqsz/mYBhRIe0DzyG0Nswk2nyVn/p+o2Ilq1eFfzrRiocP42UCuBXj4IqzUfPYjW7OzexnrhCgFblmEOnqJ811KHg4XkFKr9RxMyWaQ36gKKGx7sikbjZw8qwfMLk/QIx3dnzsrKxIcq5wl1BISy+KQgvFePesNnHtoeNWMur051gFDv4KauqPMK5egthZQSGrCU17WzMsjP8uG8vDuuU4A6UFU/l5+jbZJD9hgYFlEvqWHD3AQBv+LEUPH2E42Z0rpVEN7C8M5Por0myvyRYJAnUQHKH4fUZpE4IBj/2CX2aVn4ZjV4UCj5xNGSAmmgNWaZzEOZmqRzFKNdceRFJF2K7GRRzr0dD32piFaj6JAByd1Y5+EY1TGE+D4xk9BLQu9UEaq5jJSRXo27Ip8QzshunN+3ONJCvAbqVCkgOSwjG0umx/9W0tQy9ku+4bKK2kjbjjZVPbPUrn644Fuo2gUlQIcHi/GhaVPSpBPbUhla1Ke582tAMf2+0ChQlfdlkTFP5RvnFDIQQpCryIAiV6E2sq/bej+u9gwlD1554JEYHh2m4yE5ozGJCKFZGChUQz1g2gH6Vx9Ta/NgEl4WvBBP/FNrUhynq/SpiNKi5H3zSJbP5BSBgY1IMVa9JgHsIwamMzhNiNHAkU93IO09fWUJpTPgPEfhQP3WZF76o594ZN1zuQbJ/3Sp1PO2Hmtq5ScA6c6OClhfSRqGY0YX4bG3h2iwJ7cmbzrvFv3x6Rh2J1AsSU6tycX9IyXsoSvDJAyM+HgG3p+zNFQMmHk/Hcctdku936daAbGPpspxNa2PEadhr85UhqnayP27jFj/6JPEuh2+q+LXv6nrR30+Q+OpDL9f+9aAQAAAABJRU5ErkJggg==" />
            </a>
        </div>
        <div>
            <span v-if="time.days > 1"><a :href="url"> {{ time.days }} days<br />to COP 15.2 </a></span>
            <span v-else-if="time.days == 1"><a :href="url"> {{ time.days }} day to COP 15.2 </a></span>
            <span v-else><a :href="url"> COP 15.2 </a></span>
        </div>
    </section>
</template>
  
<script>
export default {
    name: 'CountDown',
    props: {
        endDate: Date,
        url: String,
        logo: String
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
    background-color: #FFFFFF;
    width: 120px;
    text-align: center;
    display: flex;
    font-family: Arial Black, Arial, Helvetica, sans-serif;
    font-style: bold;
    font-size: 12px;
    color: #13a89e;
}

.alignment {
  margin: auto;
}
</style>
  