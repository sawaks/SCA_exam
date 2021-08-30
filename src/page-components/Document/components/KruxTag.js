/* eslint-disable react/no-danger */
import React from 'react';

function KruxTag() {
  return (
    <>
      <script
        async
        type="text/javascript"
        src={`https://cdn.krxd.net/controltag/${process.env.KRUX_TAG}.js`}
      />
      <script
        className="kxint"
        data-namespace="sca"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);
            (function(){
              function retrieve(n){
                var k= 'kx'+'sca_'+n, ls=(function(){
                  try {
                    return window.localStorage;
                  } catch(e) {
                    return null;
                  }
                })();
                if (ls) {
                    return ls[k] || '';
                } else if (navigator.cookieEnabled) {
                    var m = document.cookie.match(k+'=([^;]*)');
                    return (m && unescape(m[1])) || '';
                } else {
                    return '';
                }
              }
              Krux.user = retrieve('user');
              Krux.segments = retrieve('segs') ? retrieve('segs').split(',') : [];
            })();
        ` }}
      />
    </>
  );
}

export default KruxTag;
