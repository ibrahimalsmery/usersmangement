@if (isset($message))
    <div class="alert {{ $message['type'] }}">{{ $message['msg'] }}</div>
@endif
