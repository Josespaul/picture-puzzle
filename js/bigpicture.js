var modules = new Vue({
    el: '#modules',
    data: {
        remove_block_on: [null, true, true, true, true, true, true, true, true, true],
        remove_block_off: [null, false, false, false, false, false, false, false, false, false],
        remove_block_show: [null, false, false, false, false, false, false, false, false, false],
        remove_block_mode: false,
        clue_input: [],
        clue_show: [true],
        points: 100,
        puzzle_data: null,
        timer: 30,
        fxtimer: null
    },

    created: function() {
        document.getElementById('container').style.cursor = 'default'
        swal("Hola !", "This Puzzle Consists of a big picure hidden behind the boxes, the puzzle completes when you answer the 'Puzzle Question', but attempts for this is limited, keep an eye on the score. There are three clues, when answered correct will let you open a box and reveal a part of the big picture.")

        fetch('puzzle_data.json')
            .then(response => response.text())
            .then((data) => {
                this.puzzle_data = JSON.parse(data)
                this.points = this.puzzle_data["total_points"]
            });
        //setTimeout(() => { this.load_clue() }, 5000);
        this.fxtimer = setInterval(() => {
            this.timer = this.timer - 1
            if (this.timer == 0) {
                clearInterval(this.fxtimer)
                this.load_clue()
                return;
            }
        }, 1000);
    },

    methods: {
        load_clue() {
            this.clue_show[0] = false
            this.clue_show[1] = true
        },

        check_main_input(data) {
            if (data.toLowerCase() == this.puzzle_data["puzzle_ans"]) {
                swal("Game Complete", "score: " + this.points, "info")
                document.getElementById('blocks').style.display = 'none'
                window.scrollTo(0, 0);
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
            if (ans.toLowerCase() == this.puzzle_data["clue_ans"][index]) {
                window.scrollTo(0, 0);
                swal('Clue ' + index, "You can now open a box in the big picture", "success");
                this.remove_block_mode = true
                this.remove_block_show = this.remove_block_on
                document.getElementById('container').style.cursor = 'pointer'
                document.getElementById(id).disabled = true
                document.getElementById('indirect_button_' + index).style.display = 'none'
                this.clue_show[index] = false
                this.clue_show[index + 1] = true
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

                    document.getElementById('container').style.cursor = 'default'
                }
            }
        }
    },

    mounted: function() {},

});