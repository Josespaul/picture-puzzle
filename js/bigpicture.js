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

    created: function() {
        swal("Hola !", "This Puzzle Consists of a big picure hidden behind the boxes, the puzzle completes when you answer the 'Puzzle Question', but attempts for this is limited, keep an eye on the score. There are three clues, when answered correct will let you open a box and reveal a part of the big picture.")
    },

    methods: {
        check_main_input(data) {
            if (data == this.clue_ans[0]) {
                swal("Game Complete", "score: " + this.points, "info")
            } else {
                this.points = this.points - 20
                data = ''
                swal("Wrong Answer", "oops! Try Again", "warning")
                if (this.points <= 0) {
                    this.points = 0
                    swal("Game Over", "", "error")
                }
            }
        },

        check_clue_input(index, id, ans) {
            if (ans == this.clue_ans[index]) {
                window.scrollTo(0, 0);
                swal('Clue ' + index, "You can now open a box in the big picture", "success");
                this.remove_block_mode = true
                this.remove_block_show = this.remove_block_on
            } else {
                swal("Wrong Answer", "oops! Try Again", "warning")
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