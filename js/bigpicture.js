var modules = new Vue({
    el: '#modules',
    data: {
        remove_block_on: [null, true, true, true, true, true, true, true, true, true],
        remove_block_off: [null, false, false, false, false, false, false, false, false, false],
        remove_block_show: [null, false, false, false, false, false, false, false, false, false],
        remove_block_mode: false,
        clue: [],
        clue_ans: ['1914', '1', '2', '3'],
        answer: '',
        points: 100
    },

    created: function() {},

    methods: {
        check_main_input(data) {
            if (data == this.clue_ans[0]) {
                alert("Game Complete")
            } else {
                this.points = this.points - 20
                data = ''
                if (this.points <= 0) {
                    this.points = 0
                    alert("Game Over !")
                }
            }
        },

        check_clue_input(index, id, ans) {
            if (ans == this.clue_ans[index]) {
                alert("Open Any one Box")
                this.remove_block_mode = true
                this.remove_block_show = this.remove_block_on
            }
        },

        remove_block(event) {
            var index = event.currentTarget.id.split('block_')[1]
            if (this.remove_block_mode == true) {
                if (this.remove_block_on[index] == true) {
                    var element = document.getElementById(event.currentTarget.id);
                    element.style.backgroundColor = 'transparent';
                    element.style.border = 'none';
                    this.remove_block_show = this.remove_block_off;

                    this.remove_block_on[index] = false
                    this.remove_block_mode = false
                }
            }
        }
    },

    mounted: function() {},

});