window.onscroll = function() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (scrollTop / scrollHeight) * 100;
  document.getElementById("progress").style.height = scrolled + "%";
};
