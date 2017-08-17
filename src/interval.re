type intervalId = int;

external setInterval : (unit => unit) => int => intervalId = "window.setInterval" [@@bs.val];

external clearInterval : intervalId => unit = "window.clearInterval" [@@bs.val];
