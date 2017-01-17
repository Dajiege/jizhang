;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-user" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M791.296 679.663616l-56.064 0c-61.923328 0-112.128-50.148352-112.128-112.001024l0-35.984384c24.80128-29.452288 42.595328-64.28672 53.653504-101.095424 1.150976-6.206464 7.118848-9.269248 11.114496-13.534208 21.462016-21.438464 25.678848-57.613312 9.582592-83.373056-2.19136-3.908608-6.131712-7.302144-5.915648-12.140544 0-32.840704 0.166912-65.73568-0.050176-98.547712-0.87552-39.622656-12.214272-80.831488-40.025088-110.170112-22.450176-23.707648-53.269504-37.81632-85.083136-43.860992-40.185856-7.656448-82.235392-7.272448-122.037248 2.843648-34.49344 8.696832-66.905088 28.875776-86.94272 58.790912-17.738752 26.00448-25.515008 57.585664-26.8288 88.704-0.49152 33.414144-0.110592 66.910208-0.218112 100.40832 0.766976 6.700032-4.929536 11.2384-7.499776 16.789504-15.166464 27.480064-8.48896 64.914432 15.878144 84.901888 6.185984 4.268032 7.33696 12.032 9.580544 18.731008 10.621952 33.086464 28.251136 63.685632 50.535424 90.345472l0 37.18656c0 61.852672-50.205696 112.002048-112.128 112.002048l-56.066048 0c0 0-101.61664 28.00128-168.193024 168.00256l0 56.000512c0 30.952448 25.076736 56.000512 56.064 56.000512l784.897024 0c30.989312 0 56.064-25.048064 56.064-56.000512l0-56.000512C892.91264 707.662848 791.296 679.663616 791.296 679.663616z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-password" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M773.022898 437.411211 773.022898 325.525981c0 0-0.030699-261.026992-261.026992-261.026992-260.989129 0-261.019829 261.026992-261.019829 261.026992l0 111.88523-65.276702 0c-25.744337 0-46.614667 20.87033-46.614667 46.614667l0 428.861488c0 25.744337 20.87033 46.614667 46.614667 46.614667l652.600225 0c25.744337 0 46.614667-20.87033 46.614667-46.614667L884.914268 484.025878c0-25.744337-20.87033-46.614667-46.614667-46.614667L773.022898 437.411211 773.022898 437.411211zM549.284161 725.390042l0 98.912777c0 12.872169-10.434653 23.306822-23.306822 23.306822l-27.956725 0c-12.872169 0-23.306822-10.434653-23.306822-23.306822l0-98.912777c-22.181185-12.923334-37.282115-36.729529-37.282115-64.234977 0-41.222867 33.412994-74.603115 74.565253-74.603115 41.159422 0 74.572416 33.380248 74.572416 74.603115C586.605162 688.661535 571.503209 712.467731 549.284161 725.390042M698.457646 437.378465 325.541331 437.378465 325.541331 326.011029c0.415462-31.240515 11.404748-186.94167 186.454576-186.94167 175.056991 0 186.04423 155.701155 186.461739 186.456622L698.457646 437.378465 698.457646 437.378465zM698.457646 437.378465"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)