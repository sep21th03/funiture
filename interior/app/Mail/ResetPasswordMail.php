<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $newPassword;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $newPassword)
    {
        $this->user = $user;
        $this->newPassword = $newPassword;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Mật khẩu mới của bạn')
                    ->view('mail.reset-password')
                    ->with([
                        'name' => $this->user->name,
                        'newPassword' => $this->newPassword,
                    ]);
    }
}
