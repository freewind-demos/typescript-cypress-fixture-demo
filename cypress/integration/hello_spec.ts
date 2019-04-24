describe('cypress', () => {
  describe('fixture', () => {
    it('can load json', () => {
      cy.fixture('example.json')
        .should('deep.equal', {
          "name": "cypress"
        })
    })

    it('can load fixture with an alias, and used in cy.route', () => {
      cy.fixture('example.json').as('example')
      cy.server();
      cy.route('GET', '/data.json', '@example').as('fetchData');

      // Notice: cy.request will always use the real endpoint
      // cy.request('/data.json');

      // We have to make XHR request from page
      cy.window().then((win: any) => {
        const request = new win.XMLHttpRequest();
        request.open('GET', '/data.json', true);
        request.send()
      })

      cy.wait('@fetchData')
        .then(res => res.response.body)
        .should('deep.equal', {
          "name": "cypress"
        });
    })

    it('can load text', () => {
      cy.fixture('hello.txt')
        .then(content => content.trim())
        .should('eq', 'Hello, cypress!')
    })

    describe('image', () => {
      it('can load image as hex', () => {
        cy.fixture('hill.png', 'hex')
          .should('eq', '89504e470d0a1a0a0000000d494844520000000f0000000f08060000003bd6954a00000abe694343504943432050726f66696c65000048899597075453d91686cfbde98d16888094d09b209d0002093d14413ad80849484209312120889dc1111c0b2a22a08ee820888215101ba2888541b1614107641051c7c1820d9577814798796fbdf7d6fbb34eceb7f6dd679fbdef3a67ad7d01207fe5482469b00a00e9e24c694480373d2e3e818eeb0710400325e00adc395c9984151e1e02104dcd7fd7877b8837a2dbd6e3b1fefdf97f952a8f2fe3020085239cc49371d3113e818ca75c8934130054296237cace948cf31984d5a5488208df1c67c124ff3ece4993fc69c2272ac207003419003c99c3910a00206b22767a165780c4213310b615f344628485087b72851c1ec2d508cf4a4fcf18e73b089b27fd258ee06f31931431391c8182276b9910de572493a47172fecfd7f1bf959e269fdac3148c17200d8c406622f2ceeea766042b589c34376c8a45bc09ff0916ca03a3a7982bf34998621ec73758b1366d6ec814278bfcd98a3899eca829e6cbfc22a7589a11a1d82b59eac39a628e747a5f796ab4c22ee4b315f1738551b1539c258a993bc5b2d4c8e0691f1f855d2a8f50e4cf1707784fefebafa83d5df6977a456cc5da4c6154a0a276ce74fe7c316b3aa62c4e911b8fefeb37ed13adf097647a2bf692a4852bfcf969010abb2c2b52b136133990d36bc315ef308513143ec52016d8233f4764804cfed2ccf1027c32243952914098496721378b4f678bb936b3e8f6b676ae008cdfd3c963f0eefec4fd8368f8695bce050098a791fba0316d8bb301e0903e00b4d0699bf1200054e41c9dbac6954bb3266de8f13f0c92953250075a400f180173608de4e50cdc0113f881201006a2403c5804b84008d2811464833cb01a148022b0196c0765600fd807aac161700c348233e002b80cae839be02e78047ac100780986c107300a41100ea24054480bd2874c202bc81e62409e901f14024540f150222480c4901cca83d6424550315406ed856aa0a3d029e8027415ea821e407dd010f416fa02a36032ac0eebc2a6f06c9801b3e060380a5e080be025702e9c0f6f844be14af810dc005f80afc377e15ef8253c820228128a86324059a318281f54182a01958c92a256a00a5125a84a541daa19d58eba8dea45bd427d4663d154341d6d8d764707a2a3d15cf412f40af4067419ba1add80be84be8dee430fa3bf6328181d8c15c60dc3c6c46104986c4c01a6045385398969c3dcc50c603e60b1581ad60ceb820dc4c66353b0cbb01bb0bbb0f5d8166c17b61f3b82c3e1b47056380f5c188e83cbc415e076e20ee1cee36ee106709ff024bc3ede1eef8f4fc08bf16bf025f883f873f85bf841fc28418560427023841178841cc226c27e4233e1066180304a54259a113d8851c414e26a6229b18ed846ec21be239148862457d23c9288b48a544a3a42ba42ea237d26ab912dc93ee40564397923f900b985fc80fc8e42a198529894044a266523a5867291f284f24989aa64a3c456e229ad542a576a50baa5f45a99a06ca2cc525ea49cab5ca27c5cf986f22b15828aa98a8f0a4765854ab9ca29956e951155aaaa9d6a986abaea06d583aa57559fabe1d44cd5fcd4786af96afbd42eaaf553515423aa0f954b5d4bdd4f6da30ea863d5cdd4d9ea29ea45ea87d53bd58735d4341c356234966a946b9cd5e8a5a168a634362d8db689768c768ff66586ee0cd60cfe8cf533ea66dc9af15173a6265393af59a859af7957f38b165dcb4f2b556b8b56a3d6636db4b6a5f63ced6cedddda6ddaaf66aacf749fc99d5938f3d8cc873ab08ea54e84ce329d7d3a1d3a23ba7aba01ba12dd9dba17755fe9d1f4987a297adbf4cee90de953f53df545fadbf4cfebbfa06bd059f4347a29fd127dd840c720d0406eb0d7a0d360d4d0cc30da708d61bde16323a211c328d9689b51abd1b0b1be71a8719e71adf143138209c34468b2c3a4dde4a3a99969ace93ad346d3e7669a666cb35cb35ab31e738ab997f912f34af33b16580b8645aac52e8b9b96b0a593a5d0b2dcf286156ce56c25b2da65d5350b33cb75967856e5ac6e6bb235cb3acbbad6bacf86661362b3c6a6d1e6f56ce3d909b3b7cc6e9ffdddd6c936cd76bfed233b35bb20bb3576cd766fed2dedb9f6e5f6771c280efe0e2b1d9a1cde385a39f21d773bde77a23a853aad736a75fae6ece22c75ae731e7231764974a970e966a833c2191b18575c31aedeae2b5dcfb87e767376cb743be6f6a7bbb57baafb41f7e773cce6f0e7ec9fd3ef61e8c1f1d8ebd1eb49f74cf4fcd9b3d7cbc08be355e9f59469c4e431ab98832c0b560aeb10ebb5b7adb7d4fba4f7471f379fe53e2dbe28df00df42df4e3f35bf68bf32bf27fe86fe02ff5affe100a78065012d8198c0e0c02d81dd6c5d36975dc31e0e72095a1e7429981c1c195c16fc34c432441ad21c0a8706856e0ded996b32573cb7310c84b1c3b6863d0e370b5f127e7a1e765ef8bcf279cf22ec22f222da23a9918b230f467e88f28eda14f528da3c5a1edd1aa31cb320a626e663ac6f6c716c6fdcecb8e571d7e3b5e345f14d09b8849884aa8491f97ef3b7cf1f58e0b4a060c1bd85660b972ebcba487b51daa2b38b951773161f4fc424c6261e4cfcca09e354724692d8491549c35c1fee0eee4b1e93b78d37c4f7e017f307933d928b939f0b3c045b0543422f6189f095c84754267a931298b227e5636a58ea81d4b1b4d8b4fa747c7a62fa29b19a38557c29432f63694697c44a5220e95de2b664fb926169b0b44a06c916ca9a32d59186a8436e2eff41de97e599559ef5293b26fbf852d5a5e2a51d399639eb730673fd737f59865ec65dd69a6790b73aaf6f396bf9de15d08aa415ad2b8d56e6af1c5815b0aa7a357175eaea5fd7d8ae295ef37e6decdae67cddfc55f9fd3f04fc505ba054202de85ee7be6ecf8fe81f453f76ae7758bf73fdf7425ee1b522dba292a2af1bb81baefd64f753e94f631b9337766e72deb47b3376b378f3bd2d5e5baa8b558b738bfbb7866e6dd846df56b8edfdf6c5dbaf963896ecd941dc21dfd15b1a52dab4d378e7e69d5fcb846577cbbdcbeb2b742ad6577cdcc5db756b377377dd1edd3d457bbefc2cfaf9fede80bd0d95a69525fbb0fbb2f63ddb1fb3bffd17c62f3555da554555df0e880ff45647545faa71a9a939a87370532d5c2baf1d3ab4e0d0cdc3be879beaacebf6d6d3ea8b8e8023f2232f8e261ebd772cf858eb71c6f1ba1326272a4e524f1636400d390dc38dc2c6dea6f8a6ae5341a75a9bdd9b4f9eb6397de08cc199f2b31a67379d239ecb3f37763ef7fc488ba4e5d505c185fed6c5ad8f2ec65dbc7369dea5ceb6e0b62b97fd2f5f6c67b59fbfe271e5cc55b7aba7ae31ae355e77beded0e1d471f257a75f4f763a7736dc70b9d174d3f56673d79cae73b7bc6e5db8ed7bfbf21df69deb77e7deedba177def7ef782eedefbbcfbcf1fa43d78f330ebe1e8a3553d989ec2c72a8f4b9ee83ca9fccde2b7fa5ee7deb37dbe7d1d4f239f3eeae7f6bffc5df6fbd781fc6794672583fa8335cfed9f9f19f21fbaf962fe8b81979297a3af0afe50fda3e2b5f9eb137f32ffec188e1b1e78237d33f676c33bad7707de3bbe6f1d091f79f221fdc3e8c7c24f5a9faa3f333eb77f89fd32389afd15f7b5f49bc5b7e6efc1df7bc6d2c7c6241c2967a2154021034e4e06e0ed010028f148af80f4ddc4f9937df484a0c9de7f82c07fe2c95e7b42ce0054ae02201619412d005420b30932ab218fc29900443101ece0a018ff942cd9c17e3216a911694d4ac6c6de213d23ce02806fdd6363a38d6363dfaa90641f02d0f261b27f1f971ef22d11930d40ded1b6fa9e55e05ff40fde8a102561f0c725000001bb4944415428154d52596edb30107da464d44014a4691114c84fee9533f410fdcb2183c24160d8a89b66f1be8864df9b11ddd2102473e62db384fbef0f2504a09402801fe7f3df7fc63c1c2cc3f299d77aae407a04a88789cc122844de15fd771165494cd776a2895692fa2e0438dae2438e48626cfe8125accbaa4e4d943cd83579de6417329724a56db7938780acfad15b8c5209c824aa212f2520eac2ad29e8352ae8a4012deda5e4cc95383401321dadf0f8891f64a2d518a3c410e8319025e524a6f3515cc0cc5fdbb6232cdf17984f2648a5c7b7db3b74575f301a8f0906727170615da1698c44772aa39d4e1ef1327bc6f17060af328efb1d2eba2b7bc6dd252eafbfa225285b79aa3d7ba76342d375373ffad3918caa8bc13ee3b4df63bbfec066f5cea600dde76b9f2b073eb483b3679989c0c07aedd0a746245b7d7fc26eb3c662fa84f57269bdc88ab30fde1382d5b0ba9ab67c16b15e1bd17eb7c5f2f59793b34e2195223d827dd504aca3d04e3aa96a4cf8f8f31b87cd76d8a8819d391c1669f40476b3d2ba8e49c438c26af586f9f34ff4a9670f384ae6ea10662d204ccd9062f637ebd306c94dcc118bd9130926e6442bc20ffc055aebdf560e632cd20000000049454e44ae426082')
      })
      // can also be 'base64', 'binary', ...
    })

  })
})
