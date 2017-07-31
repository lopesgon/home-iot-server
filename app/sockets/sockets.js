/**
 * Created by fredericlopesgoncalvesmagalhaes on 24.01.17.
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 *
 * Hereinafter the signals that can be used for killing a Child process
 * Refer to Nodejs doc for more information: https://nodejs.org/api/child_process.html#child_process_child_kill_signal
 * Refer to linux doc for more information: http://man7.org/linux/man-pages/man7/signal.7.html
 *
 * Signal     Value     Action   Comment
 ──────────────────────────────────────────────────────────────────────
 SIGHUP        1       Term    Hangup detected on controlling terminal
 or death of controlling process
 SIGINT        2       Term    Interrupt from keyboard
 SIGQUIT       3       Core    Quit from keyboard
 SIGILL        4       Core    Illegal Instruction
 SIGABRT       6       Core    Abort signal from abort(3)
 SIGFPE        8       Core    Floating-point exception
 SIGKILL       9       Term    Kill signal
 SIGSEGV      11       Core    Invalid memory reference
 SIGPIPE      13       Term    Broken pipe: write to pipe with no
 readers; see pipe(7)
 SIGALRM      14       Term    Timer signal from alarm(2)
 SIGTERM      15       Term    Termination signal
 SIGUSR1   30,10,16    Term    User-defined signal 1
 SIGUSR2   31,12,17    Term    User-defined signal 2
 SIGCHLD   20,17,18    Ign     Child stopped or terminated
 SIGCONT   19,18,25    Cont    Continue if stopped
 SIGSTOP   17,19,23    Stop    Stop process
 SIGTSTP   18,20,24    Stop    Stop typed at terminal
 SIGTTIN   21,21,26    Stop    Terminal input for background process
 SIGTTOU   22,22,27    Stop    Terminal output for background process
 */

var io = require('socket.io');
var iot = require('../python/iot');
var kill = require('tree-kill');
var Room = require('../models/room');
var exec = require('child_process').exec;
var SCRIPT_CMD = 'sudo ./motion -c ./shell/motion-mmalcam-both.conf';
var listener;
var child;
var systemState = false;

module.exports = {
  startSystemSocket: function(){
    listener.sockets.on('connection', function(socket){
      socket.emit('systemStateChange', systemState);

      socket.on('systemStateChange', function(state){
        systemState = state;
        if(systemState){
          child = exec(SCRIPT_CMD);

          child.stdout.on('data', function(data){
            //console.log('stdout:' + data);
            //console.log("Push a notification!");
          });

          child.stderr.on('data', function(data){
            //console.log('stderr:' + data);
          });

          child.on('close', function(code){
            //console.log('child close, code' + code);
            child = undefined;
          });

        } else {
          console.log('Should kill child');
          if(child){
            kill(child.pid, 'SIGKILL');
          }
        }
        socket.broadcast.emit('systemStateChange', systemState);
      });
    });
  },

  startSocketServer: function(){
    if(listener) {
      listener.sockets.on('connection', function (socket) {
        socket.on('room:object', function (data) {
          Room.findOne({_id: data.room}, function (err, room) {
            if (err) throw err;

            if (!room) {
              data.success = false;
            } else {
              var args = [data.object.checked, data.object.gpio];
              iot.objectAction(args, function (res) {
                if (res) {
                  room.updateStateObject(data.object, function (res) {
                    if (res) {
                      console.log("room update in db");
                      data.success = true;
                    }
                  });
                } else {
                  console.log("room not updated in db");
                  data.success = false;
                }
              });
            }
            socket.broadcast.emit('message', data);
          });
        });

        socket.on('join:room', function (room) {
          console.log("TODO: someone is looking to room: " + room);
        });

        // Disconnect listener
        socket.on('disconnect', function () {
          console.log('Client disconnected.');
        });
      });
    }else{
      throw new Error();
    }
  },

  sslSocketServer: function(server){
    listener = io.listen(server, {secure:true});
  },

  httpSocketServer: function(server) {
    listener = io.listen(server);
  }

};